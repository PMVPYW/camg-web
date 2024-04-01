import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const usePatrocinioStore = defineStore("patrocinios", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const patrocinios = ref(null);
    const router = useRouter();

    async function loadPatrocinios() {
        try {
            const response = await axios.get("entidade");
            patrocinios.value = response.data.data;
            console.log(patrocinios, "patrocinios")
        } catch (error) {
            clearPatrocinios();
            throw error;
        }
    }


    async function createPatrocinio(data) {
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
            patrocinios.value.push(response.data);
        } catch (error) {
            clearPatrocinios();
            loadPatrocinios();
            throw error;
        }
    }
    async function editPatrocinio(data) {
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
            patrocinios.value.push(response.data);
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
        loadPatrocinios,
        createPatrocinio,
        editPatrocinio,
        clearPatrocinios,
        patrocinios
    };
});
