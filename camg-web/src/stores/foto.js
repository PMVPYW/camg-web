import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useAlbumStore} from "@/stores/album.js";

export const useFotoStore = defineStore("foto", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const albumStore = useAlbumStore();


    const router = useRouter();
    const fotos = ref({});
    const currentAlbum = ref(null);

    async function loadFotos() {
        try {
            albumStore.albuns.forEach(async (item) => {
                var response = await axios.get(`album/${item.id}/fotos`);
                fotos.value[item.id] = response.data.data;
            })

            return fotos.value;
        } catch (error) {
            return [];
        }
    }

    async function createFoto(data) {
        console.log("create_catchau", data)
        try {
            const response = await axios.post("foto", data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            fotos.value[currentAlbum.value] = fotos.value[currentAlbum.value].concat(response.data.data);
            console.log(response, "errorar1")
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
        } catch (error) {
            throw error;
        }
    }

    return {
        loadFotos,
        fotos,
        currentAlbum,
        createFoto,
        deleteFoto
    };
});
