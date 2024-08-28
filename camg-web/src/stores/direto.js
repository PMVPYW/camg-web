import axios from "axios";
import { ref, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";
import {useRallyStore} from "@/stores/rally.js";
import {useNotificacaoStore} from "@/stores/notificacao.js";

export const useDiretoStore = defineStore("diretos", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const diretos = ref(null);

    const router = useRouter();
    const toast = useToast();

    socket.on("create_direto", (direto) => {
        diretos.value.push(direto);
        toast.success("Novo Direto");
    });

    socket.on("delete_direto", (direto) => {
        diretos.value = diretos.value.filter(
            (item) => item.id != direto,
        );
        toast.error("Direto Eliminado!");
    });

    socket.on("update_direto", (direto) => {
        var index = diretos.value.findIndex((item) => item.id === direto.id);
        if (index >= 0) {
            diretos.value[index] = direto;
        }
        if (direto.visivel)
        {
            diretos.value.forEach((dir)=>{
                dir.visivel = (dir.id == direto.id ? direto.visivel : 0)
            })
        }
        toast.warning("Direto Atualizado!");
    });

    async function loadDiretos({ filters = null }) {
        try {
            let response;
            let suffix = "?";
            if (filters != null) {
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`livestream${suffix}`);
                diretos.value = response.data.data;
                console.log("diretos",response.data.data)
            } else {
                response = await axios.get(`livestream`);
                diretos.value = response.data.data;
                console.log("diretos",response.data.data)
            }
        } catch (error) {
            throw error;
        }
    }

    async function createDireto(data) {
        try {
            const response = await axios.post("livestream", data);
            console.log(data, "Dados");
            console.log(response, "create direto");
            diretos.value.push(response.data);
            socket.emit("create_direto", response.data);
            toast.success("Direto Criado!");
            return true;
        } catch (error) {
            console.error(error);
            loadDiretos({});
            return error.response.data.errors;
        }
    }
    async function editDireto(data, id) {
        try {
            const response = await axios.put("livestream/" + id, data);
            var index = diretos.value.findIndex((item) => item.id === id);
            if (index >= 0) {
                diretos.value[index] = response.data;
            }
            socket.emit("update_direto", response.data);
            toast.warning("Direto Atualizado!");
            return true;
        } catch (error) {
            loadDiretos({});
            return error.response.data.errors;
        }
    }

    async function deleteDireto(id) {
        try {
            console.log(id);
            const response = await axios.delete("livestream/" + id);
            diretos.value = diretos.value.filter(
                (item) => item.id !== id,
            );
            socket.emit("delete_direto", id);
            toast.error("Direto Eliminado!");
        } catch (error) {
            loadDiretos({});
            throw error;
        }
    }
return{
    loadDiretos,
    diretos,
    createDireto,
    editDireto,
    deleteDireto
};
});