import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

export const useContactoStore = defineStore("contacto", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const contactos = ref(null);
    const tipo_contactos = ref(null);

    const router = useRouter();
    const toast= useToast();

    async function loadContactos({filters=null}) {
        try {
            let response;
            let suffix = "?"
            if(filters!=null){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`contacto${suffix}`);
            }else{
                response = await axios.get(`contacto${suffix}`);
            }
            contactos.value=response.data.data;
            console.log("CONTACTOS",contactos)
            console.log("Response", response)
        } catch (error) {
            throw error;
        }
    }

    return {
        loadContactos,
        contactos,
        tipo_contactos
    };
});