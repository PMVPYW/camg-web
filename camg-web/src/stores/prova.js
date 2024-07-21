import axios from "axios";
import {ref, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {useRallyStore} from "@/stores/rally.js";

export const useProvaStore = defineStore("prova", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const toast = useToast();

    const rallyStore = useRallyStore();


    const router = useRouter();
    const provas = ref(null);
    const provas_complete = ref(null);
    const provas_filtered = ref(null);


    async function loadProvas({filters=null}) {
        try {
            provas_complete.value = (await axios.get("prova")).data.data;
            let response;
            let suffix = "?"
            if(filters!=null && rallyStore.rally_selected){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get("rally/"+rallyStore.rally_selected+`/provas${suffix}`);
                provas_filtered.value = response.data.data;
            }else{
                if(rallyStore.rally_selected) {
                    response = await axios.get("rally/" + rallyStore.rally_selected + `/provas${suffix}`);
                    provas.value = response.data.data;
                    provas_filtered.value = response.data.data;
                    console.log(provas, "Provas")
                }
            }
        } catch (error) {
            throw error;
        }
    }


    async function editProva(data, id) {
        try {
            console.log(data, "Dados")
            const response = await axios.post("prova/"+id, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            var index = provas.value.findIndex(item => item.id === id);
            if(index>=0) {
                provas.value[index] = response.data.data;
            }
            index = provas_filtered.value.findIndex(item => item.id === id);
            if(index>=0) {
                provas_filtered.value[index] = response.data.data;
            }
            index = provas_complete.value.findIndex(item => item.id === id);
            if(index>=0) {
                provas_complete.value[index] = response.data.data;
            }
            console.log("EDITAR",response.data.data )
            toast.warning("Prova Atualizada!")
            return response.data.data;
        } catch (error) {
            loadProvas({})
            return error.response.data.errors;
        }
    }




    return {
        loadProvas,
        provas,
        provas_complete,
        provas_filtered,
        editProva,
    };
});
