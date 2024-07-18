import axios from "axios";
import { ref, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";
import {useRallyStore} from "@/stores/rally.js";

export const useDeclaracaoStore = defineStore("declaracao", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const declaracoes = ref(null);
    const declaracoes_filtered = ref(null);

    const rallyStore = useRallyStore();

    const router = useRouter();
    const toast= useToast();

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
                declaracoes.value=response.data.data;
                declaracoes_filtered.value = response.data.data;
                console.log(declaracoes, "Declarações")
                console.log(declaracoes_filtered, "Declarações Filters")

            }
        } catch (error) {
            throw error;
        }
    }

    async function createDeclaracao(data) {
        try {
            const response = await axios.post("noticia", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(data, "Dados")
            console.log(response, "create declaração");
            declaracoes.value.push(response.data);
            declaracoes_filtered.value.push(response.data);
            toast.success("Declaração Criada!")
        } catch (error) {
            console.error(error);
            loadDeclaracoes({})
            return error.response.data.errors;
        }
    }
    async function editDeclaracao(data, id) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("noticia/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            var index = declaracoes.value.findIndex(item => item.id === id);
            if(index>=0) {
                declaracoes.value[index] = response.data;
            }
            index = declaracoes_filtered.value.findIndex(item => item.id === id);
            if(index>=0) {
                declaracoes_filtered.value[index] = response.data;
            }
            toast.warning("Declaração Atualizada!")
        } catch (error) {
            loadDeclaracoes({})
            return error.response.data.errors;
        }
    }

    async function deleteDeclaracao(id) {
        try {
            console.log(id)
            const response = await axios.delete("noticia/"+id);
            declaracoes.value = declaracoes.value.filter((item) => item.id !== id);
            declaracoes_filtered.value = declaracoes_filtered.value.filter((item) => item.id !== id);
            console.log(declaracoes.value.length);
            toast.error("Declaração Eliminada!")
        } catch (error) {
            loadDeclaracoes({})
            throw error;
        }
    }

    return {
        loadDeclaracoes,
        declaracoes,
        declaracoes_filtered,
        createDeclaracao,
        editDeclaracao,
        deleteDeclaracao
    };
});