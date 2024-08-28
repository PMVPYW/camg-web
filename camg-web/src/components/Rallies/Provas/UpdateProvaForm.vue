<script setup xmlns="http://www.w3.org/1999/html">
import {computed, inject, ref, watch} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useNoticiaStore} from "@/stores/noticia.js";
import {useAlbumStore} from "@/stores/album.js";
import {useFotoStore} from "@/stores/foto.js";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
import {useToast} from "vue-toastification";

const serverBaseUrl = inject("serverBaseUrl");


const props = defineProps(["obj_to_edit"],["errors"]);
const emit = defineEmits(["edit"]);

const local = ref(props.obj_to_edit?.local);
const kml = ref(props.obj_to_edit?.kml_src);
const toast = useToast();




const emitNew = () => {
 const obj = {
  "local": local.value,
  "_method":"put"
 };
 if (kml.value != null && kml.value!=props.obj_to_edit.kml_src) {
  obj["kml_src"] = kml.value
 }
 emit('edit', obj);
}

const errors = ref(props.errors ?? {})

watch(()=>props.errors, (n_errors)=>{
 errors.value = n_errors ?? {};
 console.log("ERROR:", errors);
})




</script>

<template>
 <form class="m-2">
  <div class="flex flex-row">
   <div class="w-full">
    <div class="lg:flex flex-row">
     <div class="flex flex-col justify-center w-5/6 mx-auto">
      <div class="flex flex-wrap justify-center">
       <div class="w-1/3 m-4">
        <label class="block mb-2 text-base font-medium">KML da prova</label>
        <input
          type="file"
          accept=".kml"
          class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm file:hidden"
          @change="$event.target.files[0].size < 1048576 ? (kml =$event.target.files[0]): (() => {toast.error('kml is too big!',);$event.target.value = null;})()"/>
       </div>
       <div class="w-1/3 m-4">
        <label class="block mb-2 text-base font-medium">Local</label>
        <input type="text" required v-model="local"
            class="py-3 px-4 block w-full border border-gray-300 bg-gray-100 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Local">
       </div>
      </div>
     </div>
    </div>
    <br>
    <div class="flex justify-center w-full">
     <button type="button"
         @click.prevent="emitNew"
         class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-green-600 bg-green-800 text-white shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      Editar
     </button>
    </div>
   </div>
  </div>
 </form>
 <hr class="mt-5 mb-10">

</template>