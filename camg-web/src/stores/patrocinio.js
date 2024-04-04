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
    const router = useRouter();
    const rallyStore= useRallyStore();

    async function loadPatrocinios() {
        try {
            const response = await axios.get("rally/"+rallyStore.rally_selected+"/patrocinios");
            patrocinios.value = response.data.data;
            console.log(patrocinios, "patrocinios")
        } catch (error) {
            clearPatrocinios();
            throw error;
        }
    }

    async function loadEntidades() {
        try {
            const response = await axios.get("entidade");
            entidades.value = response.data.data;
            console.log(entidades, "entidade")
        } catch (error) {
            throw error;
        }
    }

    async function associarPatrocinio(data) {
        console.log(data)
        try{
            const response = await axios.post("patrocinio", data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(response.data, "create associação ao rally")
            patrocinios.value.push(response.data)
        } catch (error) {
            clearPatrocinios();
            throw error;
        }
        await loadPatrocinios();
        await loadEntidades();
    }

    async function desassociarPatrocinio() {

    }



    async function createPatrocinio(data) {
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
        clearPatrocinios();
        throw error;
    }
    await loadPatrocinios();
    await loadEntidades();

    }
    async function editPatrocinio(data) {
        try {
            const response = await axios.put("entidade", data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
        } catch (error) {
            clearPatrocinios();
            loadPatrocinios();
            throw error;
        }
    }

    async function deletePatrocinio(data) {
        try {
            const response = await axios.delete("entidade", data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(response.data, "create associação ao rally")
            patrocinios.value.push(response.data);
        } catch (error) {
            clearPatrocinios();
            loadPatrocinios();
            throw error;
        }
    }




    function clearPatrocinios() {
        patrocinios.value = null;
    }


    return {
        associarPatrocinio,
        desassociarPatrocinio,
        loadEntidades,
        entidades,
        loadPatrocinios,
        createPatrocinio,
        editPatrocinio,
        clearPatrocinios,
        patrocinios
    };
});
