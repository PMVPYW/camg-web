import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {useRallyStore} from "@/stores/rally.js";
import {useToast} from "vue-toastification";

export const usePatrocinioStore = defineStore("patrocinios", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const patrocinios = ref(null);
    const entidades = ref(null);
    const patrocinosSemAssociacao  = ref(null);
    const router = useRouter();
    const rallyStore= useRallyStore();

    const toast= useToast()

    socket.on("associar_patrocinio", (patrocinio) => {
        patrocinios.value.push(patrocinio)
        toast.success("Patrocinio associado ao rally");
    })

    socket.on("desassociar_patrocinio", (patrocinio) => {
        patrocinios.value = patrocinios.value.filter((item) => item.id != patrocinio);
        toast.error("Patrocinio desassociado ao rally");
    })


    socket.on("create_entidade", (entidade, patrocinio) => {
        patrocinios.value.push(patrocinio)
        entidades.value.push(entidade);
        toast.success("Nova Entidade");
    })

    socket.on("delete_entidade", () => {
        patrocinosSemAssociacao.value.splice(0, patrocinosSemAssociacao.value.length);
        toast.error("Todas as entidades sem associação eliminadas!");
    })

    socket.on("update_entidade", (entidade, patrocinio) => {
        var index = entidades.value.findIndex(item => item.id === entidade.id);
        if(index>=0) {
            entidades.value[index] = entidade;
        }
        index = patrocinios.value.findIndex(item => item.id === patrocinio.id)
        if(index>=0) {
            patrocinios.value[index] = patrocinio
        }
        toast.warning("Patrocinio Atualizado!");
    })



//PATROCINIOS


    async function loadPatrociniosById(id) {
        try {
            const response = await axios.get("patrocinio/"+id);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
    async function loadPatrocinios({filters = "nome_asc"}) {
        try {
            let response;
            if(filters && rallyStore.rally_selected){
                response = await axios.get("rally/"+rallyStore.rally_selected+"/patrocinios?filters="+filters);
                patrocinios.value = response.data.data;
                console.log(patrocinios, "patrocinios")
            }
        } catch (error) {
            throw error;
        }
    }

    async function loadpatrocinosSemAssociacao() {
        try {
            if(rallyStore.rally_selected){
                const response = await axios.get("rally/"+rallyStore.rally_selected+"/patrocinios_s_associacao");
                patrocinosSemAssociacao.value = response.data.data;
                console.log(patrocinosSemAssociacao, "Patrocinios Sem Associacão")
            }
        } catch (error) {
            throw error;
        }
    }


    async function associarPatrocinio(data) {
        console.log(data)
        try{
            const response = await axios.post("patrocinio/" ,data);
            console.log(response.data, "create associação ao rally")
            patrocinios.value.push(response.data)
            socket.emit("associar_patrocinio", response.data);
            toast.success("Patrocinio Associado!")

        } catch (error) {
            loadPatrocinios({});
            loadpatrocinosSemAssociacao();
            loadEntidades();
            return error.response.data.errors;
        }
    }

    async function desassociarPatrocinio(id) {
        console.log(id)
        try{
            const response = await axios.delete("patrocinio/"+ id );
            console.log(response.data.data, "Delete associação ao rally")
            patrocinios.value = patrocinios.value.filter((item) => item.id != id);
            socket.emit("desassociar_patrocinio", id);
            toast.error("Patrocinio Desassociado!")

        } catch (error) {
            throw error;
        }
    }




//ENTIDADES
    async function loadEntidades() {
        try {
            const response = await axios.get("entidade");
            entidades.value = response.data.data;
            console.log(entidades, "entidade")
        } catch (error) {
            throw error;
        }
    }

    async function createEntidade_Patrocinio(data) {
        console.log(data)
    try {
        const response = await axios.post("entidade", data, {headers: {
                'Content-Type': 'multipart/form-data'
            }});
        const data2 = {
            "entidade_id" : response.data.id,
            "rally_id" : data.rally_id,
            "entidade_oficial": 0,
            "relevancia": data.relevancia
        };
        const response2 = await axios.post("patrocinio", data2, {headers: {
                'Content-Type': 'multipart/form-data'
            }});
        console.log(response.data, "create entidade")
        console.log(response2.data, "create associação ao rally")
        patrocinios.value.push(response2.data)
        entidades.value.push(response.data);
        socket.emit("create_entidade", response.data,response2.data);
        toast.success("Entidade Criada!")
    } catch (error) {
        console.error(error)
        loadPatrocinios({});
        loadpatrocinosSemAssociacao();
        loadEntidades();
        return error.response.data.errors;    }
    }
    async function editEntidade(entidade_id, patrocinio_id ,data) {
        try {
            //Update Entidade
            data["_method"] = "PUT";
            const response = await axios.post("entidade/"+entidade_id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(response.data.data, "Atualizar Entidade do rally")
            const index = entidades.value.findIndex(item => item.id == entidade_id);

            if(index>=0) {
                entidades.value[index] = response.data.data;
            }

            //Update Patrocinio
            const data2 = {
                "relevancia": data.relevancia
            };

            const response1 = await axios.put("patrocinio/"+ patrocinio_id , data2 );
            console.log(response1.data.data, "Atualizar Patrocinio do rally")
            const index_patrocinio = patrocinios.value.findIndex(item => item.id == patrocinio_id);
            if(index_patrocinio>=0) {
                patrocinios.value[index_patrocinio] = response1.data.data;
            }
            console.log(patrocinios.value[index_patrocinio])

            socket.emit("update_entidade", response.data.data, response1.data.data);
            toast.warning("Patrocinio Atualizado!")
        } catch (error) {
            console.error(error)
            loadPatrocinios({});
            loadpatrocinosSemAssociacao();
            loadEntidades();
            return error.response.data.errors;

        }
    }

    async function deleteEntidade() {
        let deleted_entities = [];
        try {
            for(let i=0;i<entidades.value.length;i++){
                console.log(entidades.value[i].rallys.length);
                if(entidades.value[i].rallys.length===0){
                    deleted_entities.push(entidades.value[i].id);
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
            toast.error("Entidades removidas!")

        } catch (error) {
            throw error;
        }
    }




    function clearPatrocinios() {
        patrocinios.value = null;
    }


    return {
        //Associação Patrocinios
        associarPatrocinio,
        desassociarPatrocinio,
        clearPatrocinios,
        loadPatrocinios,
        loadpatrocinosSemAssociacao,
        patrocinios,
        patrocinosSemAssociacao,

        //Entidade
        deleteEntidade,
        createEntidade_Patrocinio,
        editEntidade,
        loadEntidades,
        entidades,

    };
});
