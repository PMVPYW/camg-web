import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useRallyStore = defineStore("rally", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");

  const rallies = ref(null);
  const router = useRouter();

  const rally_selected = rallies.value;

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

  async function createRally(data) {
    try {
      const response = await axios.post("rally", data, {headers: {
          'Content-Type': 'multipart/form-data'
        }});
      console.log(response.data, "create rally")
      rallies.value.push(response.data);
      console.log(rallies, "jd")
    } catch (error) {
      clearRallies();
      loadRallies();
      throw error;
    }
  }



  function clearRallies() {
    rallies.value = null;
  }


  return {
    rally_selected,
    loadRallies,
    createRally,
    clearRallies,
    rallies
  };
});
