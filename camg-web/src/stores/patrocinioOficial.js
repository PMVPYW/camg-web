import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {useRallyStore} from "@/stores/rally.js";
import {useToast} from "vue-toastification";

export const usePatrocinioOficialStore = defineStore("patrociniosOficiais", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const patrociniosOficiais = ref(null);
    const entidadesOficiais = ref(null);
    const patrociniosOficiaisSemAssociacao  = ref(null);
    const router = useRouter();
    const rallyStore= useRallyStore();

    const toast= useToast()

    socket.on("associar_patrocinio_oficial", (patrocinio) => {
        patrociniosOficiais.value.push(patrocinio)
        toast.success("Entidade Oficial associado ao rally");
    })

    socket.on("desassociar_patrocinio_oficial", (patrocinio) => {
        patrociniosOficiais.value = patrociniosOficiais.value.filter((item) => item.id != patrocinio);
        toast.error("Entidade Oficial desassociado ao rally");
    })


    socket.on("create_entidade_oficial", (entidade, patrocinio) => {
        patrociniosOficiais.value.push(patrocinio)
        entidadesOficiais.value.push(entidade);
        toast.success("Nova Entidade Oficial");
    })

    socket.on("delete_entidade_oficial", () => {
        patrociniosOficiaisSemAssociacao.value.splice(0, patrocinosOficiaisSemAssociacao.value.length);
        toast.error("Todas as entidades oficiais sem associação eliminadas!");
    })

    socket.on("update_entidade_oficial", (entidade, patrocinio) => {
        var index = entidadesOficiais.value.findIndex(item => item.id === entidade.id);
        if(index>=0) {
            entidadesOficiais.value[index] = entidade;
        }
        index = patrociniosOficiais.value.findIndex(item => item.id === patrocinio.id)
        if(index>=0) {
            patrociniosOficiais.value[index] = patrocinio;
        }
        toast.warning("Entidade Oficial Atualizada!");
    })



//PATROCINIOS_OFICIAIS


    async function loadPatrociniosOficiaisById(id) {
        try {
            const response = await axios.get("patrocinioOficial/"+id);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
    async function loadPatrociniosOficiais({filters = "nome_asc"}) {
        try {
            let response;
            if(filters && rallyStore.rally_selected){
                response = await axios.get("rally/"+rallyStore.rally_selected+"/patrociniosOficiais?filters="+filters);
                patrociniosOficiais.value = response.data.data;
                console.log(patrociniosOficiais, "patrocinios")
            }
        } catch (error) {
            throw error;
        }
    }

    async function loadpatrocinosOficiaisSemAssociacao() {
        try {
            if(rallyStore.rally_selected){
                const response = await axios.get("rally/"+rallyStore.rally_selected+"/patrociniosOficiais_s_associacao");
                patrociniosOficiaisSemAssociacao.value = response.data.data;
                console.log(patrociniosOficiaisSemAssociacao, "Patrocinios Sem Associacão")
            }
        } catch (error) {
            throw error;
        }
    }


    async function associarPatrocinioOficial(data) {
        console.log(data)
        try{
            const response = await axios.post("patrocinio/" ,data);
            console.log(response.data, "create associação ao rally")
            patrociniosOficiais.value.push(response.data)
            socket.emit("associar_patrocinio_oficial", response.data);
            toast.success("Entidade Oficial Associado!")

        } catch (error) {
            loadpatrocinosOficiaisSemAssociacao();
            loadEntidadesOficiais();
            loadPatrociniosOficiais({})
            return error.response.data.errors;
        }
    }

    async function desassociarPatrocinioOficial(id) {
        console.log(id)
        try{
            const response = await axios.delete("patrocinio/"+ id );
            console.log(response.data.data, "Delete associação ao rally")
            patrociniosOficiais.value = patrociniosOficiais.value.filter((item) => item.id != id);
            socket.emit("desassociar_patrocinio_oficial", id);
            toast.error("Entidade Oficial Desassociado!")

        } catch (error) {
            throw error;
        }
    }




//ENTIDADES_OFICIAIS
    async function loadEntidadesOficiais() {
        try {
            const response = await axios.get("entidadeOficial");
            entidadesOficiais.value = response.data.data;
            console.log(entidadesOficiais, "entidade")
        } catch (error) {
            throw error;
        }
    }

    async function createEntidade_PatrocinioOficial(data) {
        console.log(data)
        try {
            const response = await axios.post("entidade", data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            const data2 = {
                "entidade_id" : response.data.id,
                "rally_id" : data.rally_id,
                "entidade_oficial": 1,
                "relevancia": data.relevancia
            };
            const response2 = await axios.post("patrocinio", data2, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(response.data, "create entidade")
            console.log(response2.data, "create associação ao rally")
            patrociniosOficiais.value.push(response2.data)
            entidadesOficiais.value.push(response.data);
            socket.emit("create_entidade_oficial", response.data,response2.data);
            toast.success("Entidade Oficial Criada!")
        } catch (error) {
            console.error(error);
            loadpatrocinosOficiaisSemAssociacao();
            loadEntidadesOficiais();
            loadPatrociniosOficiais({})
            return error.response.data.errors;
        }
    }
    async function editEntidadeOficial(entidade_id, patrocinio_id ,data) {
        try {
            //Update Entidade
            data["_method"] = "PUT";
            const response = await axios.post("entidade/"+entidade_id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            const index = entidadesOficiais.value.findIndex(item => item.id == entidade_id);
            if(index>=0) {
                entidadesOficiais.value[index] = response.data.data;
            }

            //Update Patrocinio Oficial
            const data2 = {
                "relevancia": data.relevancia
            };

            const response1 = await axios.put("patrocinio/"+ patrocinio_id , data2 );
            console.log(response1.data.data, "Atualizar Patrocinio do rally")
            const index_patrocinio = patrociniosOficiais.value.findIndex(item => item.id == patrocinio_id);
            if(index_patrocinio>=0) {
                patrociniosOficiais.value[index_patrocinio] = response1.data.data;
            }

            console.log(patrociniosOficiais.value[index_patrocinio])

            socket.emit("update_entidade_oficial", response.data.data, response1.data.data);
            toast.warning("Entidade Oficial Atualizada!")
        } catch (error) {
            console.error(error);
            loadpatrocinosOficiaisSemAssociacao();
            loadEntidadesOficiais();
            loadPatrociniosOficiais({})
            return error.response.data.errors;
        }
    }

    async function deleteEntidadeOficial() {
        let deleted_entities = [];
        try {
            for(let i=0;i<entidadesOficiais.value.length;i++){
                console.log(entidadesOficiais.value[i].rallys.length);
                if(entidadesOficiais.value[i].rallys.length===0){
                    deleted_entities.push(entidadesOficiais.value[i].id);
                    console.log("Entidades a Eliminar",deleted_entities)
                }
            }
            const data = {
                "entidades_id" : deleted_entities,
            };
            const response = await axios.delete("destroyAllEntities", {
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }});
            console.log(response.data, "Delete Entidade sem associação ao rally")
            socket.emit("delete_entidade_oficial");
            toast.error("Entidades Oficiais removidas!")

        } catch (error) {
            throw error;
        }
    }




    function clearPatrociniosOficiais() {
        patrociniosOficiais.value = null;
        entidadesOficiais.value = null;
    }


    return {
        //Associação Patrocinios
        associarPatrocinioOficial,
        desassociarPatrocinioOficial,
        clearPatrociniosOficiais,
        loadPatrociniosOficiais,
        loadpatrocinosOficiaisSemAssociacao,
        loadPatrociniosOficiaisById,
        patrociniosOficiais,
        patrociniosOficiaisSemAssociacao,


        //Entidade
        deleteEntidadeOficial,
        createEntidade_PatrocinioOficial,
        editEntidadeOficial,
        loadEntidadesOficiais,
        entidadesOficiais,

    };
});
