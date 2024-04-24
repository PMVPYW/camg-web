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


    return {
    };
});