import {defineStore} from "pinia";
import {inject, ref} from "vue";
import axios from "axios";
import {useToast} from "vue-toastification";

export const useHistoriaStore = defineStore("historia", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const historias = ref(null);
    const historias_filtered = ref(null);
    const toast = useToast();
    async function loadHistorias({filters=null}) {
        try {
            let response;
            let suffix = "?"
            if(filters!=null){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`historia${suffix}`);
                historias_filtered.value = response.data.data;
            }else{
                response = await axios.get(`historia${suffix}`);
                historias.value=response.data.data;
                historias_filtered.value = response.data.data;
                console.log(historias, "Histórias")
            }
        } catch (error) {
            throw error;
        }
    }

    async function createHistoria(data) {
        try {
            console.log("DATA", data)
            const data_historia = {
                "titulo" : data.titulo,
                "conteudo" : data.conteudo,
                "subtitulo": data.subtitulo,
                "photo_url": data.photo_url
            };
            const response_historia = await axios.post("historia", data_historia, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});

            console.log("response_historia", response_historia.data.id);


            if(data.capitulos) {
                for (const capitulo of data.capitulos) {

                    console.log("CAPITULO", capitulo);
                    console.log("response_historia.data.i", response_historia.data.i);

                    const data_capitulo = {
                        "historia_id": response_historia.data.id,
                        "titulo": capitulo.titulo
                    };
                    const response_capitulo = await axios.post("capitulo", data_capitulo);

                    console.log("response_capitulo", response_capitulo);

                    if(data.etapas) {
                        for (const etapa of data.etapas) {

                            console.log("ETAPA", etapa);

                            if (etapa.capitulo_id === capitulo.id) {
                                const data_etapa = {
                                    "capitulo_id": response_capitulo.data.id,
                                    "nome": etapa.nome,
                                    "ano_inicio": etapa.ano_inicio,
                                    "ano_fim": etapa.ano_fim
                                };

                                console.log(data_etapa);

                                const response_etapa = await axios.post("etapa", data_etapa);

                                console.log("response_etapa", response_etapa);

                            }
                        }
                    }
                }
            }
            loadHistorias({})
            toast.success("História Criada!")
        } catch (error) {
            console.error(error);
            loadHistorias({})
            return error.response.data.errors;
        }
    }
    async function editHistoria(data, id) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("historia/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            var index = historias.value.findIndex(item => item.id === id);
            if(index>=0) {
                historias.value[index] = response.data;
            }
            index = historias_filtered.value.findIndex(item => item.id === id);
            if(index>=0) {
                historias_filtered.value[index] = response.data;
            }
            toast.warning("História Atualizada!")
        } catch (error) {
            loadHistorias({})
            return error.response.data.errors;
        }
    }

    async function deleteHistoria(id) {
        try {
            console.log(id)
            const response = await axios.delete("historia/"+id);
            historias.value = historias.value.filter((item) => item.id !== id);
            historias_filtered.value = historias_filtered.value.filter((item) => item.id !== id);
            console.log(historias.value.length);
            toast.error("História Eliminada!")
        } catch (error) {
            loadHistorias({})
            throw error;
        }
    }
    return{
        historias,
        historias_filtered,
        loadHistorias,
        createHistoria,
        editHistoria,
        deleteHistoria
    };
})
