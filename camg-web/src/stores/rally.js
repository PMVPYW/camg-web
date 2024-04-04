import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useRallyStore = defineStore("rally", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");

  const rallies = ref(null);
  const router = useRouter();

  async function loadRallies(filters = null) {
    try {
      let suffix = "?"
      if (filters != null)
      {
        for (const filter in filters) {
          suffix += `${filter}=${filters[filter]}&`;
        }
      }
      const response = await axios.get(`rally${suffix}`);
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
      console.log(response, "errorar1")
      return true;
    } catch (error) {
      clearRallies();
      loadRallies();
      console.log(error, "errorar2")
      return error.response.data.errors;
    }
  }

  async function updateRally(data, id) {
    try {
      data["_method"] = "PUT";
      const response = await axios.post("rally/" + id, data, {headers: {
          'Content-Type': 'multipart/form-data'
        }});

        const index = rallies.value.findIndex(item => item.id === id);
        rallies.value[index] = response.data.data;
        return true;

    } catch (error) {
      clearRallies();
      loadRallies();
      return error.response.data.errors;
    }
  }

  async function deleteRally(id) {
    try {
      const response = await axios.delete("rally/"+id);
      if (response.status == 200)
      {
        rallies.value = rallies.value.filter((item) => item.id != id);
      }
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
    loadRallies,
    createRally,
    clearRallies,
    deleteRally,
    updateRally,
    rallies
  };
});
