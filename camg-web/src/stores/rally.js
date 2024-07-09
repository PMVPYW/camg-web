import axios from "axios";
import { ref, inject } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { usePatrocinioStore } from "@/stores/patrocinio.js";
import { usePatrocinioOficialStore } from "@/stores/patrocinioOficial.js";

export const useRallyStore = defineStore("rally", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");

  const patrocinioStore = usePatrocinioStore();
  const patrocinioOficialStore = usePatrocinioOficialStore();
  const rallies = ref(null);
  const rallies_filtered = ref(null);
  const router = useRouter();
  const toast = useToast();
  let rally_selected = ref();

  socket.on("create_rally", (rally) => {
    rallies.value.push(rally);
    rallies_filtered.value.push(rally);
    toast.success("Novo Rally!");
  });

  socket.on("delete_rally", (rally) => {
    rallies.value = rallies.value.filter((item) => item.id != rally.id);
    rallies_filtered.value = rallies_filtered.value.filter(
      (item) => item.id != rally.id,
    );
    toast.error("Rally Eliminado!");
  });

  socket.on("update_rally", (rally) => {
    var index = rallies.value.findIndex((item) => rally.id == item.id);
    if (index >= 0) {
      rallies.value[index] = rally;
    }
    index = rallies_filtered.value.findIndex((item) => rally.id == item.id);
    if (index >= 0) {
      rallies_filtered.value[index] = rally;
    }
    toast.warning("Rally Atualizado!");
  });

  async function loadRallies() {
    try {
      const response = await axios.get(`rally`);
      rallies.value = response.data.data;
      if (rallies.value.length > 0) {
        rally_selected.value = rallies.value[0].id;
      }
      if (rallies_filtered.value == null) {
        rallies_filtered.value = [...rallies.value];
      }
    } catch (error) {
      clearRallies();
      throw error;
    }
  }

  async function loadRalliesWithFilters(filters = null) {
    try {
      let suffix = "?";
      if (filters != null) {
        for (const filter in filters) {
          suffix += `${filter}=${filters[filter]}&`;
        }
      }
      const response = await axios.get(`rally${suffix}`);
      rallies_filtered.value = response.data.data;
    } catch (error) {
      clearRallies();
      throw error;
    }
  }

  async function createRally(data) {
    try {
      const response = await axios.post("rally", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data_copyProvas = {
        rally_id: response.data.id,
        external_entity_id: data["external_entity_id"],
      };
      const copyProvas = await axios.post("copyProvas", data_copyProvas);

      if (rallies_filtered.value != null) {
        rallies_filtered.value.push(response.data);
      }
      rallies.value.push(response.data);
      if (rallies.value.length < 2) {
        rally_selected.value = rallies.value[0].id;
      }
      console.log(response, "errorar1");
      socket.emit("create_rally", response.data);
      toast.success("Rally Criado!");
      return true;
    } catch (error) {
      clearRallies();
      loadRallies();
      console.log(error, "errorar2");
      return error.response.data.errors;
    }
  }

  async function updateRally(data, id) {
    try {
      data["_method"] = "PUT";
      const response = await axios.post("rally/" + id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      var index = rallies.value.findIndex((item) => item.id === id);
      rallies.value[index] = response.data.data;
      index = rallies_filtered.value.findIndex((item) => item.id === id);
      if (index != -1) {
        rallies_filtered.value[index] = response.data.data;
      }
      console.log("daads", response.data.data);
      socket.emit("update_rally", response.data.data);
      toast.warning("Rally Atualizado!");
      return true;
    } catch (error) {
      clearRallies();
      loadRallies();
      return error.response.data.errors;
    }
  }

  async function deleteRally(id) {
    try {
      const response = await axios.delete("rally/" + id);
      rallies.value = rallies.value.filter((item) => item.id != id);
      rallies_filtered.value = rallies_filtered.value.filter(
        (item) => item.id != id,
      );
      patrocinioStore.clearPatrocinios();
      patrocinioOficialStore.clearPatrociniosOficiais();
      console.log("RALLY SELECTED", rally_selected.value);
      if (rally_selected.value == id) {
        rally_selected.value = null;
      }
      socket.emit("delete_rally", response.data.data);
    } catch (error) {
      clearRallies();
      loadRallies();
      throw error;
    }
  }

  function clearRallies() {
    rallies.value = null;
    rallies_filtered.value = null;
  }

  return {
    loadRallies,
    loadRalliesWithFilters,
    createRally,
    clearRallies,
    deleteRally,
    updateRally,
    rallies,
    rallies_filtered,
    rally_selected,
  };
});
