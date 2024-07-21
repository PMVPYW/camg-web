import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

export const useConselhoSegurancaStore = defineStore("conselhoSeguranca", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const toast = useToast();
    const concelhos_seguranca = ref(null);

    async function loadConcelhosSeguranca(filters = null) {
        try {
            var sufix = "?";
            if (filters != null) {
                for (const filter in filters) {
                    sufix += `${filter}=${filters[filter]}&`;
                }
            }
            const response = await axios.get(`conselhoseguranca${sufix}`);
            concelhos_seguranca.value = response.data.data;
            console.log(concelhos_seguranca, "concelhos_seguranca")
        } catch (error) {
            clearAlbuns();
            throw error;
        }
    }

    return {
        loadConcelhosSeguranca
    };
});
