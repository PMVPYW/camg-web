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
            console.log("DATA", data);
            const data_historia = {
                "titulo" : data.titulo,
                "conteudo" : data.conteudo,
                "subtitulo": data.subtitulo,
                "photo_url": data.photo_url,
                "capitulos": [],
                "etapas" : []
            };
            if(data.capitulos) {
                for (const capitulo of data.capitulos) {
                    const data_capitulo = {
                        "capitulo_id": capitulo.id,
                        "titulo": capitulo.titulo,
                    };
                    data_historia["capitulos"].push(data_capitulo)
                    if(data.etapas) {
                        for (const etapa of data.etapas) {
                            if (etapa.capitulo_id === capitulo.id) {
                                const data_etapa = {
                                    "capitulo_id": etapa.capitulo_id,
                                    "nome": etapa.nome,
                                    "ano_inicio": etapa.ano_inicio,
                                    "ano_fim": etapa.ano_fim
                                };
                                data_historia["etapas"].push(data_etapa)
                            }
                        }
                    }
                }
            }
            const response_historia = await axios.post("historiaCompleta", data_historia, {headers: {'Content-Type': 'multipart/form-data'}});
            console.log(response_historia);
            toast.success("História Criada!")
        } catch (error) {
            console.error(error);
            loadHistorias({})
            return error.response.data.errors;
        }
    }
    async function editHistoria(data, id) {
        try {
            console.log("DATA", data);
            const data_historia = {
                "titulo" : data.titulo,
                "conteudo" : data.conteudo,
                "subtitulo": data.subtitulo,
                "photo_url": data.photo_url,
                "capitulos": [],
                "etapas" : []
            };
            if(data.capitulos) {
                for (const capitulo of data.capitulos) {
                    const data_capitulo = {
                        "id" : capitulo.id,
                        "capitulo_id": capitulo.etapas ? capitulo.etapas[0].capitulo_id : null,
                        "titulo": capitulo.titulo,
                    };
                    data_historia["capitulos"].push(data_capitulo)
                    if(data.etapas) {
                        for (const etapa of data.etapas) {
                            if (etapa.capitulo_id === capitulo.id) {
                                const data_etapa = {
                                    "id": etapa.id,
                                    "capitulo_id": etapa.capitulo_id,
                                    "nome": etapa.nome,
                                    "ano_inicio": etapa.ano_inicio,
                                    "ano_fim": etapa.ano_fim
                                };
                                data_historia["etapas"].push(data_etapa)
                            }
                        }
                    }
                }
            }
            data_historia["_method"] = "PUT";

            console.log(data_historia)

            //const response = await axios.post("historiaCompleta/"+id, data, {headers: {'Content-Type': 'multipart/form-data'}});

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
