import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useAlbumStore = defineStore("album", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");

  const albuns = ref(null);
  const router = useRouter();

  async function loadAlbuns(filters = null) {
    try {
      var sufix = "?";
      if (filters != null)
      {
        for (const filter in filters) {
          sufix += `${filter}=${filters[filter]}&`;
        }
      }
      const response = await axios.get(`album${sufix}`);
      albuns.value = response.data.data;
      console.log(albuns, "albuns")
    } catch (error) {
      clearAlbuns();
      throw error;
    }
  }

  async function createAlbum(data) {
    try {
      const response = await axios.post("album", data, {headers: {
          'Content-Type': 'multipart/form-data'
        }});
      console.log(response.data, "create album")
      albuns.value.push(response.data);
      console.log(response, "errorar1")
      return true;
    } catch (error) {
      clearAlbuns();
      loadAlbuns();
      console.log(error, "errorar2")
      console.log(error.response.data.errors, "asnkxc")
      return error.response.data.errors;
    }
  }

  async function updateAlbum(data, id) {
    try {
      data["_method"] = "PUT";
      const response = await axios.post("album/" + id, data, {headers: {
          'Content-Type': 'multipart/form-data'
        }});

        const index = albuns.value.findIndex(item => item.id === id);
        console.log("old", albuns.value[index], "at")
        albuns.value[index] = response.data.data;
      console.log("new", albuns.value[index], "at")
        return true;

    } catch (error) {
      clearAlbuns();
      loadAlbuns();
      return error.response.data.errors;
    }
  }

  async function deleteAlbum(id) {
    try {
      const response = await axios.delete("album/"+id);
      if (response.status == 200)
      {
        albuns.value = albuns.value.filter((item) => item.id != id);
      }
    } catch (error) {
      clearAlbuns();
      loadAlbuns();
      throw error;
    }
  }



  function clearAlbuns() {
    albuns.value = null;
  }


  return {
    loadAlbuns,
    createAlbum,
    clearAlbuns,
    deleteAlbum,
    updateAlbum,
    albuns
  };
});
