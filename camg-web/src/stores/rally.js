import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useRallyStore = defineStore("rally", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");

  const rallies = ref(null);
  const router = useRouter();

  async function loadRallies() {
    try {
      const response = await axios.get("rally");
      rallies.value = response.data.data;
      console.log(rallies, "jd")
    } catch (error) {
      clearRallies();
      throw error;
    }
  }



  function clearRallies() {
    rallies.value = null;
  }


  return {
    loadRallies,
    clearRallies,
    rallies
  };
});
