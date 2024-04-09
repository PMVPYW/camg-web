import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useFotoStore = defineStore("foto", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");



  const router = useRouter();
  const currentFotos = ref([]);

  async function getFotos(Album_id)
  {
    try {
      const response = await axios.get(`album/${Album_id}/fotos`);
      currentFotos.value = response.data.data;
      return response.data.data;
    } catch (error) {
      return [];
    }
  }

  async function deleteFoto(id)
  {
    try{
      const response = await axios.delete(`foto/${id}`);
      currentFotos.value = currentFotos.value.filter((item) => item.id != id);
    } catch (error){
      throw error;
    }
  }

  return {
      getFotos,
      currentFotos,
      deleteFoto
  };
});
