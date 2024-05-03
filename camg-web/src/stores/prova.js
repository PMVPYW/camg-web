import axios from "axios";
import {ref, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

export const useProvaStore = defineStore("prova", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const toast = useToast();


    const router = useRouter();
    const provas = ref(null);
    const provas_filtered = ref(null);


    async function loadProvas({filters=null}) {
        try {
            let response;
            let suffix = "?"
            if(filters!=null){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`prova${suffix}`);
                provas_filtered.value = response.data.data;
            }else{
                response = await axios.get(`prova${suffix}`);
                provas.value=response.data.data;
                provas_filtered.value = response.data.data;
                console.log(provas, "Provas")
            }
            console.log("Response", response)
        } catch (error) {
            throw error;
        }
    }



    return {
        loadProvas,
        provas,
        provas_filtered,
    };
});
