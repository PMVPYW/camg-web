import axios from "axios";
import { ref, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";
import {useRallyStore} from "@/stores/rally.js";

export const useDeclaracaoStore = defineStore("declaracao", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const declaracoes_filtered = ref(null);

    const rallyStore = useRallyStore();

    const router = useRouter();
    const toast= useToast();

    socket.on("create_declaracao", (declaracao) => {
        declaracoes_filtered.value.push(declaracao);
        toast.success("Nova Declaração");
    });

    socket.on("delete_declaracao", (declaracao) => {
        declaracoes_filtered.value = declaracoes_filtered.value.filter(
            (item) => item.id != declaracao,
        );
        toast.error("Declaração Eliminada!");
    });

    socket.on("update_declaracao", (declaracao) => {
        var index = declaracoes_filtered.value.findIndex((item) => item.id === declaracao.id);
        if (index >= 0) {
            declaracoes_filtered.value[index] = declaracao;
        }
        toast.warning("Declaração Atualizada!");
    });

    async function loadDeclaracoes({filters=null}) {
        try {
            let response;
            let suffix = "?"
            if(filters!=null){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`rally/`+rallyStore.rally_selected+`/declaracoes${suffix}`);
                declaracoes_filtered.value = response.data.data;
            }else{
                response = await axios.get(`rally/`+rallyStore.rally_selected+`/declaracoes`);
                declaracoes_filtered.value = response.data.data;
                console.log(declaracoes_filtered, "Declarações Filters")
            }
        } catch (error) {
            throw error;
        }
    }

    async function createDeclaracao(data) {
        console.log("Data",data)
        try {
            const response = await axios.post("declaracao", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(data, "Dados")
            console.log(response, "create declaração");
            declaracoes_filtered.value.push(response.data);
            socket.emit("create_declaracao",response.data);
            toast.success("Declaração Criada!");
            return true;
        } catch (error) {
            console.error(error);
            loadDeclaracoes({})
            return error.response.data.errors;
        }
    }
    async function editDeclaracao(data, id) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("declaracao/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            var index = declaracoes_filtered.value.findIndex(item => item.id === id);
            if(index>=0) {
                declaracoes_filtered.value[index] = response.data.data;
            }
            socket.emit("update_declaracao",response.data.data);
            toast.warning("Declaração Atualizada!")
            return true;
        } catch (error) {
            loadDeclaracoes({})
            return error.response.data.errors;
        }
    }

    async function deleteDeclaracao(id) {
        try {
            console.log(id)
            const response = await axios.delete("declaracao/"+id);
            declaracoes_filtered.value = declaracoes_filtered.value.filter((item) => item.id !== id);
            socket.emit("delete_declaracao",id);
            toast.error("Declaração Eliminada!")
        } catch (error) {
            loadDeclaracoes({})
            throw error;
        }
    }

    return {
        loadDeclaracoes,
        declaracoes_filtered,
        createDeclaracao,
        editDeclaracao,
        deleteDeclaracao
    };
});