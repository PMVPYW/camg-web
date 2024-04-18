import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";

export const useNoticiaStore = defineStore("noticias", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const noticias = ref(null);
    const noticias_filtered = ref(null);

    const router = useRouter();
    const toast= useToast();


    socket.on("create_noticia", (noticia) => {
        noticias.value.push(noticia);
        toast.success("Nova Noticia");
    })

    socket.on("delete_noticia", (noticia) => {
        noticias.value = noticias.value.filter((item) => item.id != noticia);
        toast.error("Noticia Eliminada!");
    })

    socket.on("update_noticia", (noticia) => {
        const index = noticias.value.findIndex(item => item.id === noticia.id);
        noticias.value[index] = noticia;
        toast.warning("Noticia Atualizada!");
    })


    async function loadNoticias({filters=null}) {
        try {
            let response;
            let suffix = "?"
            if(filters!=null){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`noticia${suffix}`);
                noticias_filtered.value = response.data.data;
            }else{
                response = await axios.get(`noticia${suffix}`);
                noticias.value=response.data.data;
                noticias_filtered.value = response.data.data;
                console.log(noticias, "Noticias")
            }
            console.log("Response", response)
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
            socket.emit("create_noticia", response.data);
            toast.success("Noticia Criada!")
        } catch (error) {
            loadNoticias({})
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
            socket.emit("update_noticia", response.data);
            toast.warning("Noticia Atualizada!")
        } catch (error) {
            loadNoticias({})
            throw error;
        }
    }

    async function deleteNoticia(id) {
        try {
            console.log(id)
            const response = await axios.delete("noticia/"+id);
            noticias.value = noticias.value.filter((item) => item.id !== id);
            console.log(noticias.value.length);
            socket.emit("delete_noticia", id);
            toast.success("Noticia Eliminada!")
        } catch (error) {
            loadNoticias({})
            throw error;
        }
    }

    return {
        loadNoticias,
        noticias,
        noticias_filtered,
        createNoticia,
        editNoticia,
        deleteNoticia
    };
});