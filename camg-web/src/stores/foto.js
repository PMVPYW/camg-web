import axios from "axios";
import {ref, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useAlbumStore} from "@/stores/album.js";
import {useToast} from "vue-toastification";

export const useFotoStore = defineStore("foto", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const albumStore = useAlbumStore();
    const socket = inject("socket");
    const toast = useToast();


    const router = useRouter();
    const fotos = ref({});
    const currentAlbum = ref(null);

    socket.on("create_foto", (album_id, fotos_lst) => {
        console.log(fotos.value[album_id].length)
        fotos.value[album_id] = fotos.value[album_id].concat(fotos_lst);
        toast.success(fotos_lst.length < 2 ? "Foto Carregada" : "Fotos Carregadas!");
        console.log(fotos.value[album_id].length)
    })

    socket.on("delete_foto", (album_id, foto) => {
        fotos.value[album_id] = fotos.value[album_id].filter((item) => item.id != foto.id);
        toast.error("Foto Eliminada!");
    })

    socket.on("update_foto", (album_id, foto) => {
        const index = fotos.value[album_id].findIndex((item) => foto.id == item.id);
        if (index >= 0) {
            fotos.value[album_id][index] = foto;
            toast.warning("Foto Atualizada!");
        }
    })

    async function loadFotos() {
        try {
            albumStore.albuns.forEach(async (item) => {
                const response = await axios.get(`album/${item.id}/fotos`);
                fotos.value[item.id] = response.data.data;
            })

            return fotos.value;
        } catch (error) {
            return [];
        }
    }

    async function createFoto(data) {
        try {
            const response = await axios.post("foto", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fotos.value[currentAlbum.value] = fotos.value[currentAlbum.value].concat(response.data.data);
            socket.emit("create_foto", currentAlbum.value, response.data.data)
            toast.success(response.data.data.length < 2 ? "Foto Carregada" : "Fotos Carregadas!")
            return true;
        } catch (error) {
            await loadFotos();
            return error.response.data.errors;
        }
    }

    async function updateFoto(data, id) {
        data["_method"] = "PUT";
        try {
            const response = await axios.post(`foto/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response, "dsa")
            var index = fotos.value[currentAlbum.value].findIndex(item => item.id === id);
            fotos.value[currentAlbum.value][index] = response.data.data;
            socket.emit("update_foto", currentAlbum.value, response.data.data);
            toast.warning("Foto Atualizada!");
            return true;
        } catch (error) {
            loadFotos();
            return error.response.data.errors;
        }
    }

    async function deleteFoto(id) {
        try {
            const response = await axios.delete(`foto/${id}`);
            fotos.value[currentAlbum.value] = fotos.value[currentAlbum.value].filter((item) => item.id != id);
            socket.emit("delete_foto", currentAlbum.value, response.data.data);
            toast.error("Foto Eliminada!");
        } catch (error) {
            throw error;
        }
    }

    return {
        loadFotos,
        fotos,
        currentAlbum,
        createFoto,
        updateFoto,
        deleteFoto
    };
});
