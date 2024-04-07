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

    return {
        loadNoticias,
        noticias
    };
});