import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

export const useConselhoSegurancaStore = defineStore("conselhoSeguranca", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const toast = useToast();
    const conselhos_seguranca = ref(null);

    async function loadConselhosSeguranca(filters = null) {
        try {
            var sufix = "?";
            if (filters != null) {
                for (const filter in filters) {
                    sufix += `${filter}=${filters[filter]}&`;
                }
            }
            const response = await axios.get(`conselhoseguranca${sufix}`);
            conselhos_seguranca.value = response.data.data;
            console.log(conselhos_seguranca, "conselhos_seguranca")
        } catch (error) {
            throw error;
        }
    }

    async function createConselhoSeguranca(data) {
        try {
            const response = await axios.post("conselhoseguranca", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            conselhos_seguranca.value.push(response.data.data);
            socket.emit("create_conselho_seguranca", response.data.data);
            toast.success("Conselho de Segurança Criado!")
            return true;
        } catch (error) {
            loadConselhosSeguranca();
            console.log(error, "errorar2")
            return error.response.data.errors;
        }
    }

    async function deleteConselhoSeguranca(id) {
        try {
            const response = await axios.delete("conselhoseguranca/" + id);
            conselhos_seguranca.value = conselhos_seguranca.value.filter((item) => item.id != id);
            toast.error("Conselho de Segurança Eliminado!");
            socket.emit("delete_conselho_seguranca", response.data.data);
        } catch (error) {
            loadConselhosSeguranca();
            throw error;
        }
    }

    return {
        conselhos_seguranca,
        loadConselhosSeguranca,
        createConselhoSeguranca,
        deleteConselhoSeguranca
    };
});
