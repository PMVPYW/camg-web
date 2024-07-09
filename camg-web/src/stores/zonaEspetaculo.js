import axios from "axios";
import { ref, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useRallyStore } from "@/stores/rally.js";

export const useZonaEspetaculoStore = defineStore("zonaEspetaculo", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");
  const toast = useToast();

  const router = useRouter();
  const zonaEspetaculo = ref(null);
  const zonaEspetaculo_filtered = ref(null);
  const rallyStore = useRallyStore();
  const map_store = ref(null);

  async function loadZonaEspetaculo({ filters = null }) {
    try {
      let response;
      let suffix = "?";
      if (filters != null) {
        for (const filter in filters) {
          suffix += `${filter}=${filters[filter]}&`;
        }
        response = await axios.get(
          "rally/" + rallyStore.rally_selected + `/zonasEspetaculo${suffix}`,
        );
        zonaEspetaculo_filtered.value = response.data.data;
        console.log("Zona Espetaculo LOAD", response.data);
        return true;
      } else {
        response = await axios.get(
          "rally/" + rallyStore.rally_selected + `/zonasEspetaculo${suffix}`,
        );
        zonaEspetaculo.value = response.data.data;
        zonaEspetaculo_filtered.value = response.data.data;
        console.log(zonaEspetaculo, "Zona Espetaculo");
      }
    } catch (error) {
      throw error;
    }
  }

  async function createZonaEspetaculo(data) {
    try {
      const response = await axios.post("zonaEspetaculo", data);
      console.log(data, "Dados");
      console.log(response, "create zonaEspetaculo");
      zonaEspetaculo.value.push(response.data.data);
      zonaEspetaculo_filtered.value.push(response.data.data);
      toast.success("Zona Espetaculo Criada!");
      console.log("Zona Espetaculo CREATE", zonaEspetaculo.value);
      return true;
    } catch (error) {
      console.error(error, "erro_grave");
      loadZonaEspetaculo({});
      return error.response.data.errors;
    }
  }

  async function editZonaEspetaculo(data, id) {
    try {
      console.log(id, "Id");
      console.log(data, "Dados");
      const response = await axios.put("zonaEspetaculo/" + id, data);
      var index = zonaEspetaculo.value.findIndex((item) => item.id === id);
      if (index >= 0) {
        zonaEspetaculo.value[index] = response.data.data;
      }
      index = zonaEspetaculo_filtered.value.findIndex((item) => item.id === id);
      if (index >= 0) {
        zonaEspetaculo_filtered.value[index] = response.data.data;
      }
      console.log("EDITAR", response.data.data);
      toast.warning("Zona Espetaculo Atualizada!");
      return true;
    } catch (error) {
      loadZonaEspetaculo({});
      return error.response.data.errors;
    }
  }

  async function deleteZonaEspetaculo(id) {
    try {
      console.log(id);
      const response = await axios.delete("zonaEspetaculo/" + id);
      zonaEspetaculo.value = zonaEspetaculo.value.filter(
        (item) => item.id !== id,
      );
      zonaEspetaculo_filtered.value = zonaEspetaculo_filtered.value.filter(
        (item) => item.id !== id,
      );
      console.log(zonaEspetaculo.value.length);
      toast.error("Zona Espetaculo Eliminada!");
    } catch (error) {
      loadZonaEspetaculo({});
      throw error;
    }
  }

  function setMapInstance(map) {
    map_store.value = map;
  }

  function getMapInstance() {
    return map_store.value;
  }

  return {
    loadZonaEspetaculo,
    setMapInstance,
    getMapInstance,
    createZonaEspetaculo,
    editZonaEspetaculo,
    deleteZonaEspetaculo,
    zonaEspetaculo,
    zonaEspetaculo_filtered,
  };
});
