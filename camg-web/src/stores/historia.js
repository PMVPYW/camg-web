import {defineStore} from "pinia";
import {inject, ref} from "vue";
import axios from "axios";
import {useToast} from "vue-toastification";

export const useHistoriaStore = defineStore("historia", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const historias_filtered = ref(null);
    const toast = useToast();


    socket.on("create_historia", (historia) => {
        historias_filtered.value.push(historia);
        toast.success("Nova História");
    });

    socket.on("delete_historia", (historia) => {
        historias_filtered.value = historias_filtered.value.filter(
            (item) => item.id != historia,
        );
        toast.error("História Eliminada!");
    });

    socket.on("update_historia", (historia) => {
        var index = historias_filtered.value.findIndex((item) => item.id === historia.id);
        if (index >= 0) {
            historias_filtered.value[index] = historia;
        }
        toast.warning("História Atualizada!");
    });

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
                response = await axios.get(`historia`);
                historias_filtered.value = response.data.data;
            }
            console.log(historias_filtered, "História")
        } catch (error) {
            throw error;
        }
    }

    async function createHistoria(data) {
        try {
            console.log("DATA", data);
            const data_historia = {
                "titulo" : data.titulo,
                "subtitulo": data.subtitulo,
            };
            if (data.photo_url != null) {
                data_historia["photo_url"] = data.photo_url
            }
            if (data.conteudo != null) {
                data_historia["conteudo"] = data.conteudo
            }
            if(data.capitulos) {
                data_historia["capitulos"] = []
                if(data.etapas) {
                    data_historia["etapas"] = []
                }
                for (const capitulo of data.capitulos) {
                    const data_capitulo = {
                        "capitulo_id": capitulo.id,
                        "titulo": capitulo.titulo,
                    };
                    data_historia["capitulos"].push(data_capitulo)
                    if(data.etapas) {
                        for (const etapa of data.etapas) {
                            if (etapa.capitulo_id == capitulo.id) {
                                const data_etapa = {
                                    "capitulo_id": etapa.capitulo_id,
                                    "nome": etapa.nome,
                                    "ano_inicio": etapa.ano_inicio,
                                };
                                if (etapa.ano_fim != null) {
                                    data_etapa["conteudo"] = etapa.ano_fim
                                }
                                data_historia["etapas"].push(data_etapa)
                            }
                        }
                    }
                }
            }
            console.log("DATAHISTORIA", data_historia)
            const response = await axios.post("historiaCompleta", data_historia, {headers: {'Content-Type': 'multipart/form-data'}});
            historias_filtered.value.push(response.data)
            socket.emit("create_historia",response.data);
            toast.success("História Criada!")
            return true;

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
                "subtitulo": data.subtitulo,
                "capitulos": [],
                "etapas":[],
            };
            if (data.photo_url != null) {
                data_historia["photo_url"] = data.photo_url
            }
            if (data.conteudo != null) {
                data_historia["conteudo"] = data.conteudo
            }
            if(data.capitulos.length) {
                console.log("entrou");
                for (const capitulo of data.capitulos) {
                    console.log(capitulo.edit)
                    const data_capitulo = {
                        "id" : capitulo.edit ? -1 : capitulo.id,
                        "capitulo_id": capitulo.id,
                        "titulo": capitulo.titulo,
                    };
                    data_historia["capitulos"].push(data_capitulo)
                    if(data.etapas.length) {
                        for (const etapa of data.etapas) {
                            if (etapa.capitulo_id === data_capitulo.capitulo_id) {
                                console.log("Etapa",etapa)
                                console.log("Etapa_id",etapa.id)
                                etapa.edit ? console.log("Etapa_validated",etapa.edit) : console.log("n caiu")
                                const data_etapa = {
                                    "id": etapa.edit ? -1 : etapa.id,
                                    "capitulo_id": etapa.capitulo_id,
                                    "nome": etapa.nome,
                                    "ano_inicio": etapa.ano_inicio,
                                };
                                if (etapa.ano_fim != null) {
                                    data_etapa["conteudo"] = etapa.ano_fim
                                }
                                data_historia["etapas"].push(data_etapa)
                            }
                        }
                    }
                }
            }
            console.log(data_historia)
            data_historia["_method"] = "PUT";
            const response = await axios.post("historiaCompleta/"+id, data_historia, {headers: {'Content-Type': 'multipart/form-data'}});
            console.log(response.data)
            let index = historias_filtered.value.findIndex(item => item.id === id);
            if(index>=0) {
                historias_filtered.value[index] = response.data;
            }
            socket.emit("update_historia",response.data);
            toast.warning("História Atualizada!")
            return true;
        } catch (error) {
            console.error(error)
            loadHistorias({})
            return error.response.data.errors;
        }
    }

    async function deleteHistoria(id) {
        try {
            console.log(id)
            const response = await axios.delete("historia/"+id);
            historias_filtered.value = historias_filtered.value.filter((item) => item.id !== id);
            socket.emit("delete_historia",id);
            toast.error("História Eliminada!")
        } catch (error) {
            loadHistorias({})
            throw error;
        }
    }
    return{
        historias_filtered,
        loadHistorias,
        createHistoria,
        editHistoria,
        deleteHistoria
    };
})
