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

    socket.on("associar_patrocinio", (patrocinio) => {
        patrociniosOficiais.value.push(patrocinio)
        toast.success("Patrocinio Oficial associado ao rally");
    })

    socket.on("desassociar_patrocinio", (patrocinio) => {
        patrociniosOficiais.value = patrociniosOficiais.value.filter((item) => item.id != patrocinio.id);
        toast.error("Patrocinio Oficial desassociado ao rally");
    })

    socket.on("create_entidade", (entidade, patrocinio) => {
        patrociniosOficiais.value.push(patrocinio)
        entidadesOficiais.value.push(entidade);
        toast.success("Nova Entidade Oficial");
    })

    socket.on("delete_entidade", () => {
        patrociniosOficiaisSemAssociacao.value.splice(0, patrocinosOficiaisSemAssociacao.value.length);
        toast.error("Todas as entidades oficiais sem associação eliminadas!");
    })

    socket.on("update_entidade", (entidade, patrocinio) => {
        var index = entidadesOficiais.value.findIndex(item => item.id === entidade.id);
        if(index>=0) {
            entidadesOficiais.value[index] = entidade;
        }
        const patrocinio_rally = entidadesOficiais.rallys.find(item => item.rally_id == rallyStore.rally_selected)
        index = patrociniosOficiais.value.findIndex(item => item.entidade_id.id == entidade.id)
        if(index>=0) {
            patrociniosOficiais.value[index] = patrocinio
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
            socket.emit("associar_patrocinio", response.data);
            toast.success("Patrocinio Oficial Associado!")

        } catch (error) {
            throw error;
        }
    }

    async function desassociarPatrocinioOficial(id) {
        console.log(id)
        try{
            const response = await axios.delete("patrocinio/"+ id );
            console.log(response.data, "Delete associação ao rally")
            patrociniosOficiais.value = patrociniosOficiais.value.filter((item) => item.id != id);
            socket.emit("desassociar_patrocinio", response.data);
            toast.error("Patrocinio Oficial Desassociado!")

        } catch (error) {
            throw error;
        }
    }

    async function editPatrocinioOficial(data,id) {
        try{
            console.log("Id",id);
            console.log("Data",data);

            const response = await axios.put("patrocinio/"+ id , data );
            console.log(response.data.data, "Atualizar Patrocinio do rally")
            const index_patrocinio = patrociniosOficiais.value.filter((item) => item.id == id)
            if(index_patrocinio>=0) {
                patrociniosOficiais.value[index_patrocinio] = response.data.data;
            }
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
            socket.emit("create_entidade", response.data,response2.data);
            toast.success("Entidade Oficial Criada!")
        } catch (error) {
            throw error;
        }
    }
    async function editEntidadeOficial(entidade_id,data) {
        try {
            console.error("ENTROU NO EDIT", patrociniosOficiais)
            data["_method"] = "PUT";
            const response = await axios.post("entidade/"+entidade_id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            const index = entidadesOficiais.value.findIndex(item => item.id == entidade_id);
            if(index>=0) {
                entidadesOficiais.value[index] = response.data.data;
            }
            const patrocinio_rally = response.data.data.rallys.find(item => item.rally_id == rallyStore.rally_selected)
            console.log("rally_id", patrocinio_rally)



            const patrocinio_entidade= response.data.data.rallys.find(item=> item.entidade_id == entidade_id)
            console.log("ENTIDADE", patrocinio_entidade)

            const index_patrocinio = patrociniosOficiais.value.findIndex(item => item.entidade_id.id == entidade_id)
            console.log("index_patrocinio",index_patrocinio);

            const patrocinio= await loadPatrociniosOficiaisById(patrocinio_rally.id)

            if(index_patrocinio>=0) {
                patrociniosOficiais.value[index_patrocinio] = patrocinio;
            }
            console.log(patrociniosOficiais.value[index_patrocinio])


            //patrocinios.value[index_patrocinio] = patrocinio;
            //console.log(patrocinios.value[index_patrocinio])

            /*
            console.log(response.data.data.rallys);

            response.data.data.rallys.forEach((patrocinio)=>{
                const index_patrocinio = patrocinios.value.findIndex(item => item.entidade_id.id == id)
                console.log(index_patrocinio);
                //entidade
                const entidade_id = {...entidades.value.find(item => item.id == patrocinio.entidade_id)};

                //rally
                const rally_id = {...rallyStore.rallies.find(item => item.id == patrocinio.rally_id)};

                patrocinios.value[index_patrocinio]["rally_id"] = rally_id;
                patrocinios.value[index_patrocinio]["entidade_id"] = entidade_id;

            })*/
            console.error("SAIU NO EDIT", patrociniosOficiais)

            socket.emit("update_entidade", response.data.data, patrocinio);
            toast.warning("Entidade Oficial Atualizada!")
        } catch (error) {
            throw error;
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
            socket.emit("delete_entidade");
            toast.error("Entidades Oficiais removidas!")

        } catch (error) {
            throw error;
        }
    }




    function clearPatrociniosOficiais() {
        patrociniosOficiais.value = null;
    }


    return {
        //Associação Patrocinios
        editPatrocinioOficial,
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
