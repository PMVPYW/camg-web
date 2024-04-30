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
    const tipo_contactos_filters = ref(null);


    const router = useRouter();
    const toast= useToast();


    //Contacto
    socket.on("create_contacto", (contacto) => {
        contactos.value.push(contacto);
        toast.success("Novo Contacto");
    })

    socket.on("delete_contacto", (contacto) => {
        contactos.value = contactos.value.filter((item) => item.id != contacto);
        toast.error("Contacto Eliminado!");
    })

    socket.on("update_contacto", (contacto) => {
        const index = contactos.value.findIndex(item => item.id === contacto.id);
        contactos.value[index] = contacto;
        toast.warning("Contacto Atualizado!");
    })

    //TipoContacto
    socket.on("create_tipocontacto", (tipocontacto) => {
        tipo_contactos.value.push(tipocontacto);
        toast.success("Novo Tipo de Contacto");
    })

    socket.on("delete_tipocontacto", (tipocontacto) => {
        tipo_contactos.value = contactos.value.filter((item) => item.id != tipocontacto);
        toast.error("Tipo de Contacto Eliminada!");
    })

    socket.on("update_tipocontacto", (tipocontacto) => {
        const index = tipo_contactos.value.findIndex(item => item.id === tipocontacto.id);
        tipo_contactos.value[index] = tipocontacto;
        toast.warning("Tipo de Contacto Atualizada!");
    })

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
                tipo_contactos.value=response.data.data;
            }
            tipo_contactos_filters.value=response.data.data;
            console.log("TipoContactos",tipo_contactos)
            console.log("Response", response)
        } catch (error) {
            throw error;
        }
    }

    async function createContacto(data){
        try {
            console.log("DATA",data)

            const response = await axios.post("contacto",data);
            contactos.value.push(response.data)
            console.log("RESPONSE",response.data);
            socket.emit("create_contacto", response.data);
            toast.success("Contacto criado com sucesso");
        }catch (error){
            throw error;
        }
    }
    async function editContacto(data,id){
        try {
            console.log("DATA",data)
            const response = await axios.put("contacto/"+id, data);
            const index = contactos.value.findIndex(item => item.id === id);
            contactos.value[index] = response.data.data;
            console.log("RESPONSE",response.data.data);
            socket.emit("update_contacto", response.data.data);
            toast.warning("Contacto atualizado com sucesso");
        }catch (error){
            throw error;
        }
    }
    async function deleteContacto(id){
        try {
            const response = await axios.delete("contacto/"+id);
            contactos.value = contactos.value.filter((item) => item.id !== id);
            socket.emit("delete_contacto", id);
            toast.error("Contacto eliminado com sucesso");
        }catch (error){
            throw error;
        }
    }

    async function createTipoContacto(data){
        try {
            const response = await axios.post("tipocontacto",data);
            tipo_contactos.value.push(response.data)
            console.log("RESPONSE",response.data);
            socket.emit("create_tipocontacto", response.data);
            toast.success("Tipo de Contacto criado com sucesso");
        }catch (error){
            throw error;
        }
    }

    async function editTipoContacto(data,id){
        try {
            console.log("DATA",data)
            const response = await axios.put("tipocontacto/"+id, data);
            const index = tipo_contactos.value.findIndex(item => item.id === id);
            tipo_contactos.value[index] = response.data.data;
            console.log("RESPONSE",response.data.data);
            socket.emit("update_tipocontacto", response.data.data);
            toast.warning("Tipo de Contacto atualizado com sucesso");
        }catch (error){
            throw error;
        }
    }
    async function deleteTipoContacto(id){
        try {
            const response = await axios.delete("tipocontacto/"+id);
            tipo_contactos.value = tipo_contactos.value.filter((item) => item.id !== id);
            socket.emit("delete_tipocontacto", id);
            toast.error("Tipo de Contacto eliminado com sucesso");
        }catch (error){
            throw error;
        }
    }

    return {
        loadTipoContactos,
        loadContactos,
        createContacto,
        deleteContacto,
        editContacto,
        createTipoContacto,
        deleteTipoContacto,
        editTipoContacto,
        contactos,
        tipo_contactos,
        tipo_contactos_filters
    };
});