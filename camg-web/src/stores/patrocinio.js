import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import {useRallyStore} from "@/stores/rally.js";

export const usePatrocinioStore = defineStore("patrocinios", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const patrocinios = ref(null);
    const entidades = ref(null);
    const patrocinosSemAssociacao  = ref(null);
    const router = useRouter();
    const rallyStore= useRallyStore();


//PATROCINIOS
    async function loadPatrocinios() {
        try {
            const response = await axios.get("rally/"+rallyStore.rally_selected+"/patrocinios");
            patrocinios.value = response.data.data;
            console.log(patrocinios, "patrocinios")
        } catch (error) {
            throw error;
        }
    }

    async function loadpatrocinosSemAssociacao() {
        try {
            const response = await axios.get("rally/"+rallyStore.rally_selected+"/patrocinios_s_associacao");
            patrocinosSemAssociacao.value = response.data.data;
            console.log(patrocinosSemAssociacao, "Patrocinios Sem Associacão")
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
        } catch (error) {
            throw error;
        }
        loadpatrocinosSemAssociacao();
        loadPatrocinios();
        loadEntidades();
    }

    async function desassociarPatrocinio(data) {
        console.log(data)
        try{
            const response = await axios.delete("patrocinio/"+ data, );
            console.log(response.data, "Delete associação ao rally")
        } catch (error) {
            throw error;
        }
        loadpatrocinosSemAssociacao();
        loadPatrocinios();
        loadEntidades();
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

    } catch (error) {
        throw error;
    }
    loadpatrocinosSemAssociacao();
    loadPatrocinios();
    loadEntidades();

    }
    async function editEntidade(id,data) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("entidade/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            entidades.value.push(response.data);
        } catch (error) {
            throw error;
        }
        loadpatrocinosSemAssociacao();
        loadPatrocinios();
        loadEntidades();
    }

    async function deleteEntidade() {
        console.log(entidades.value.length);
        try {
            for(let i=0;i<entidades.value.length;i++){
                console.log(entidades.value[i].rallys.length);
                if(entidades.value[i].rallys.length===0){
                    console.log("Sem Associação",entidades.value[i].id)
                    const response = await axios.delete("entidade/"+ entidades.value[i].id, );
                    console.log(response.data, "Delete Entidade sem associação ao rally")
                }
            }
        } catch (error) {
            throw error;
        }
        loadpatrocinosSemAssociacao();
        loadPatrocinios();
        loadEntidades();
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
