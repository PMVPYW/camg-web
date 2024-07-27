import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import {useNotificacaoStore} from "@/stores/notificacao.js";

export const useNoticiaStore = defineStore("noticias", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");
  const notificacaoStore = useNotificacaoStore();

  const noticias_filtered = ref(null);

  const router = useRouter();
  const toast = useToast();

  socket.on("create_noticia", (noticia) => {
    noticias_filtered.value.push(noticia);
    toast.success("Nova Noticia");
  });

  socket.on("delete_noticia", (noticia) => {
    noticias_filtered.value = noticias_filtered.value.filter(
      (item) => item.id != noticia,
    );
    toast.error("Noticia Eliminada!");
  });

  socket.on("update_noticia", (noticia) => {
    var index = noticias_filtered.value.findIndex((item) => item.id === noticia.id);
    if (index >= 0) {
      noticias_filtered.value[index] = noticia;
    }
    toast.warning("Noticia Atualizada!");
  });

  async function loadNoticias({ filters = null }) {
    try {
      let response;
      let suffix = "?";
      if (filters != null) {
        for (const filter in filters) {
          suffix += `${filter}=${filters[filter]}&`;
        }
        response = await axios.get(`noticia${suffix}`);
        noticias_filtered.value = response.data.data;
      } else {
        response = await axios.get(`noticia`);
        noticias_filtered.value = response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }

  async function createNoticia(data) {
    try {
      const response = await axios.post("noticia", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "Dados");
      console.log(response, "create noticia");
      noticias_filtered.value.push(response.data);
      socket.emit("create_noticia", response.data);
      toast.success("Noticia Criada!");

      console.log("data1",data);
      data['tipo'] = 'Noticia';
      console.log("data2",response.data);


      //Enviar notificação
      notificacaoStore.enviar_notificacao(response.data);

      return true;
    } catch (error) {
      console.error(error);
      loadNoticias({});
      return error.response.data.errors;
    }
  }
  async function editNoticia(data, id) {
    try {
      data["_method"] = "PUT";
      const response = await axios.post("noticia/" + id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      var index = noticias_filtered.value.findIndex((item) => item.id === id);
      if (index >= 0) {
        noticias_filtered.value[index] = response.data;
      }
      socket.emit("update_noticia", response.data);
      toast.warning("Noticia Atualizada!");
      return true;
    } catch (error) {
      loadNoticias({});
      return error.response.data.errors;
    }
  }

  async function deleteNoticia(id) {
    try {
      console.log(id);
      const response = await axios.delete("noticia/" + id);
      noticias_filtered.value = noticias_filtered.value.filter(
        (item) => item.id !== id,
      );
      socket.emit("delete_noticia", id);
      toast.error("Noticia Eliminada!");
    } catch (error) {
      loadNoticias({});
      throw error;
    }
  }

  return {
    loadNoticias,
    noticias_filtered,
    createNoticia,
    editNoticia,
    deleteNoticia,
  };
});
