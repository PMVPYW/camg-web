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
        patrocinios.value = patrocinios.value.filter((item) => item.id != patrocinio.id);
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
        const index = entidades.value.findIndex(item => item.id === entidade.id);
        entidades.value[index] = entidade;
        const patrocinio_rally = entidade.rallys.find(item => item.rally_id == rallyStore.rally_selected)
        const index_patrocinio = patrocinios.value.findIndex(item => item.entidade_id.id == entidade.id)
        patrocinios.value[index_patrocinio] = patrocinio
        toast.warning("Entidade Atualizada!");
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
            console.log(filters)
            if(filters && rallyStore.rally_selected){
                response = await axios.get("rally/"+rallyStore.rally_selected+"/patrocinios?filters="+filters);
                console.log("Response", response)
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
            throw error;
        }
    }

    async function desassociarPatrocinio(id) {
        console.log(id)
        try{
            const response = await axios.delete("patrocinio/"+ id );
            console.log(response.data, "Delete associação ao rally")
            patrocinios.value = patrocinios.value.filter((item) => item.id != id);
            socket.emit("desassociar_patrocinio", response.data);
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
        throw error;
    }
    }
    async function editEntidade(id,data) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("entidade/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            const index = entidades.value.findIndex(item => item.id == id);
            entidades.value[index] = response.data.data;
            const patrocinio_rally = response.data.data.rallys.find(item => item.rally_id == rallyStore.rally_selected)
            console.log("rally_id", patrocinio_rally)



            const patrocinio_entidade= response.data.data.rallys.find(item=> item.entidade_id == id)
            console.log("ENTIDADE", patrocinio_entidade)

            const index_patrocinio = patrocinios.value.findIndex(item => item.entidade_id.id == id)
            console.log(index_patrocinio);

            const patrocinio= await loadPatrociniosById(patrocinio_rally.id)
            patrocinios.value[index_patrocinio] = patrocinio;
            console.log(patrocinios.value[index_patrocinio])




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

            socket.emit("update_entidade", response.data.data, patrocinio);
            toast.warning("Entidade Atualizada!")
        } catch (error) {
            throw error;
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
