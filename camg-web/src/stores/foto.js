import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useAlbumStore} from "@/stores/album.js";

export const useFotoStore = defineStore("foto", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const albumStore = useAlbumStore();
  const socket = inject("socket");


  const router = useRouter();
  const fotos = ref({});

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
  async function deleteFoto(id) {
    try {
      const response = await axios.delete(`foto/${id}`);
      fotos.value = fotos.value.filter((item) => item.id != id);
    } catch (error) {
      throw error;
    }
  }

  return {
      loadFotos,
      fotos,
      deleteFoto
  };
});
