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

    async function loadTipoContactos({filters=null}) {
        try {
            let response;
            let suffix = "?"
            if(filters!=null){
                for (const filter in filters) {
                    suffix += `${filter}=${filters[filter]}&`;
                }
                response = await axios.get(`tipocontacto${suffix}`);
            }else{
                response = await axios.get(`tipocontacto${suffix}`);
            }
            tipo_contactos.value=response.data.data;
            console.log("TipoContactos",tipo_contactos)
            console.log("Response", response)
        } catch (error) {
            throw error;
        }
    }

    async function createContacto(){

    }
    async function editContacto(){

    }
    async function deleteContacto(){

    }

    async function createTipoContacto(){

    }
    async function deleteTipoContacto(){

    }

    return {
        loadTipoContactos,
        loadContactos,
        createContacto,
        deleteContacto,
        editContacto,
        createTipoContacto,
        deleteTipoContacto,
        contactos,
        tipo_contactos
    };
});