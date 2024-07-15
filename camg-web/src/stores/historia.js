import {defineStore} from "pinia";
import {inject, ref} from "vue";
import axios from "axios";
import {useToast} from "vue-toastification";

export const useHistoriaStore = defineStore("historia", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const historias = ref(null);
    const historias_filtered = ref(null);
    const toast = useToast();
    async function loadHistorias({filters=null}) {
        try {
            let response;
            let suffix = "?"
            if(filters!=null){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`historia${suffix}`);
                historias_filtered.value = response.data.data;
            }else{
                response = await axios.get(`historia${suffix}`);
                historias.value=response.data.data;
                historias_filtered.value = response.data.data;
                console.log(historias, "Histórias")
            }
        } catch (error) {
            throw error;
        }
    }

    async function createHistoria(data) {
        try {
            const response = await axios.post("historia", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log(data, "Dados")
            console.log(response, "create historia");
            historias.value.push(response.data);
            historias_filtered.value.push(response.data);
            toast.success("História Criada!")
        } catch (error) {
            console.error(error);
            loadHistorias({})
            return error.response.data.errors;
        }
    }
    async function editHistoria(data, id) {
        try {
            data["_method"] = "PUT";
            const response = await axios.post("historia/"+id, data, {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            var index = historias.value.findIndex(item => item.id === id);
            if(index>=0) {
                historias.value[index] = response.data;
            }
            index = historias_filtered.value.findIndex(item => item.id === id);
            if(index>=0) {
                historias_filtered.value[index] = response.data;
            }
            toast.warning("História Atualizada!")
        } catch (error) {
            loadHistorias({})
            return error.response.data.errors;
        }
    }

    async function deleteHistoria(id) {
        try {
            console.log(id)
            const response = await axios.delete("historia/"+id);
            historias.value = historias.value.filter((item) => item.id !== id);
            historias_filtered.value = historias_filtered.value.filter((item) => item.id !== id);
            console.log(historias.value.length);
            toast.error("História Eliminada!")
        } catch (error) {
            loadHistorias({})
            throw error;
        }
    }
    return{
        historias,
        historias_filtered,
        loadHistorias,
        createHistoria,
        editHistoria,
        deleteHistoria
    };
})
