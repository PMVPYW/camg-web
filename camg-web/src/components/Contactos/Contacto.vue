<script setup>
import {inject} from "vue";
import {useContactoStore} from "@/stores/contacto.js";
import { Icon } from '@iconify/vue';


const props = defineProps(["contacto"])
const serverBaseUrl = inject("serverBaseUrl");
const contactoStore = useContactoStore();


const dict = {
 Fax: "fa-solid:fax",
 Email: "mdi:email",
 Telefone: "ic:sharp-phone",
 Telemovel: "gridicons:phone",
 Facebook: "mdi:facebook",
 Instagram: "ri:instagram-line",
 Twitter: "pajamas:twitter",
 PaginaWeb: "mdi:web",
 WhatsApp: "ic:baseline-whatsapp",
 Morada: "mdi:address-marker",
 Coordenadas: "gis:map-poi",
};

</script>
<template>
 <div class="pb-1 my-2">
  <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-2 py-2 rounded-xl bg-clip-border">
   <div class=" flex flex-row px-1 items-center">
    <h1 class="text-xl text-gray-500 mx-2">{{props.contacto.tipo_valor}}</h1>
    <Icon class="text-amber-600 text-2xl font-bold mx-2" :icon="dict[props.contacto.tipo_valor]" />
    <h1 class="text-xl text-gray-600 mx-1">{{ props.contacto.valor }}</h1>
    <h1 class="text-xl font-bold text-gray-800">- {{ props.contacto.nome }}</h1>
   </div>
  </div>
 </div>
</template>