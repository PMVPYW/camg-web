import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useNoticiaStore = defineStore("noticias", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const noticias = ref(null);
    const router = useRouter();

    async function loadNoticias({filters = ""}) {
        try {
            let response;
            if(filters){
                response = await axios.get("noticia?filters="+filters);
            }else{
                response = await axios.get("noticia");
            }
            console.log("Response", response)
            noticias.value = response.data.data;
            console.log(noticias, "Noticias")
        } catch (error) {
            throw error;
        }
    }

    async function createNoticia(data) {
        console.log(data)
        try {
            const response = await axios.post("noticia", data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(response.data, "create noticia")
            noticias.value.push(response.data);
            loadNoticias({});
        } catch (error) {
            throw error;
        }
    }
    async function editNoticia(id,data) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("noticia/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            noticias.value.push(response.data);
            loadNoticias({});
        } catch (error) {
            throw error;
        }
    }

    async function deleteNoticia(id) {
        try {
            const response = await axios.delete("noticia/"+id);
            console.log(response)
            loadNoticias({});
        } catch (error) {
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