<script setup xmlns="http://www.w3.org/1999/html">
import {computed, inject, ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useNoticiaStore} from "@/stores/noticia.js";
import {useAlbumStore} from "@/stores/album.js";
import {useFotoStore} from "@/stores/foto.js";
import Dashboard from "@/components/Dashboard/Dashboard.vue";

const serverBaseUrl = inject("serverBaseUrl");


const props = defineProps(["obj_to_edit"]);
const emit = defineEmits(["edit"]);

const local = ref(props.obj_to_edit?.local);
const nome = ref(props.obj_to_edit?.nome);
const distancia = ref(props.obj_to_edit?.distancia_percurso);
const data = ref(props.obj_to_edit?.data_inicio);




const emitNew = () => {
  const obj = {
    "local": local.value,
    "nome": nome.value,
    "distancia_percurso": distancia.value,
  };
  if (data.value != '') {
    obj["data_inicio"] = data.value
  }
  emit('edit', obj);
}



</script>

<template>
  <form class="m-2">
    <div class="flex flex-row">
      <div class="w-full">
        <div class="lg:flex flex-row">
          <div class="flex flex-col justify-center w-5/6 mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4">
              <div>
                <label class="block mb-2 text-base font-medium">Nome</label>
                <input type="text" required v-model="nome"
                       class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                       placeholder="Nome Prova">
              </div>
              <div>
                <label class="block mb-2 text-base font-medium">Data Inicio</label>
                <input type="date" required v-model="data"
                       class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Data Inicio">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4">
              <div>
                <label class="block mb-2 text-base font-medium">Distância</label>
                <input type="text" required v-model="distancia"
                       class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                       placeholder="Distancia em metros">
              </div>
              <div>
                <label class="block mb-2 text-base font-medium">Local</label>
                <input type="text" required v-model="local"
                       class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Local">
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-center w-full">
          <button type="button"
                  @click.prevent="emitNew"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Editar
          </button>
        </div>
      </div>
    </div>
  </form>
  <hr class="mt-5 mb-10">

</template>