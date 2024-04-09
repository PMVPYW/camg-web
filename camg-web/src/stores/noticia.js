import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useNoticiaStore = defineStore("noticias", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const noticias = ref(null);
    const router = useRouter();

    async function loadNoticias() {
        try {
            let response;
            response = await axios.get("noticia");
            console.log("Response", response)
            noticias.value=response.data.data;
            console.log(noticias, "Noticias")
        } catch (error) {
            throw error;
        }
    }

    async function createNoticia(data) {
        try {
            const response = await axios.post("noticia", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(data, "Dados")
            console.log(response, "create noticia");
            noticias.value.push(response.data);
        } catch (error) {
            loadNoticias()
            throw error;
        }
    }
    async function editNoticia(data, id) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("noticia/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(data, "Dados")
            console.log(response, "edit Noticia");
            const index = noticias.value.findIndex(item => item.id === id);
            noticias.value[index] = response.data;
        } catch (error) {
            loadNoticias()
            throw error;
        }
    }

    async function deleteNoticia(id) {
        try {
            const response = await axios.delete("noticia/"+id);
            noticias.value = noticias.value.filter((item) => item.id != id);
            console.log(noticias.value.length);
        } catch (error) {
            loadNoticias()
            throw error;
        }
    }

    return {
        loadNoticias,
        noticias,
        createNoticia,
        editNoticia,
        deleteNoticia
    };
});