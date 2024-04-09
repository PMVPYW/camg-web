<script setup xmlns="http://www.w3.org/1999/html">
import {computed, inject, ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useNoticiaStore} from "@/stores/noticia.js";

const serverBaseUrl = inject("serverBaseUrl");


const props = defineProps(["obj_to_edit"]);
const emit = defineEmits(["create", "edit"]);


const titulo = ref(props.obj_to_edit?.titulo);
const conteudo = ref(props.obj_to_edit?.conteudo);
const title_img = ref(props.obj_to_edit?.title_img);
const data = ref(props.obj_to_edit?.data);
const rally_id = ref(null);



const photos_id = ref(null);
const rallyStore=useRallyStore();
const patrocinioStore= usePatrocinioStore();
const noticiaStore=useNoticiaStore();


const emitNew = () => {
  const obj = {
    "titulo": titulo.value,
    "conteudo": conteudo.value,
    "title_img": title_img.value,
    "data": data.value,
  };
  if (photos_id.value != null) {
    obj["fotos_id"] = photos_id.value
  }
  if (rally_id.value != null) {
    obj["rally_id"] = rally_id.value
  }
  emit(props.obj_to_edit ? 'edit' : "create", obj);
}

</script>

<template>
  <form class="m-2">
    <div class="flex flex-row">
      <div>
        <div class="flex flex-row">
          <div class="flex flex-col justify-center w-full">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4">
              <div>
                <label class="block mb-2 text-base font-medium">Titulo</label>
                <input type="text" required v-model="titulo" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Titulo Noticia">
              </div>
              <div>
                <label class="block mb-2 text-base font-medium">Data</label>
                <input type="date" required v-model="data" class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Data">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4">
              <div class="col-span-full">
                <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Conteúdo</label>
                <div class="mt-2">
                  <textarea id="about" required v-model="conteudo" rows="3" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center w-full">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4">
              <div>
                <label class="block mb-2 text-base font-medium">Titulo da Imagem</label>
                <input type="text" required v-model="title_img" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Titulo da Imagem">
              </div>
              <div>
                <label class="block mb-2 text-base font-medium">Rally</label>
                <select class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                  <option></option>
                  <option class="uppercase" v-for="rally in rallyStore.rallies" :value="rally.id">{{rally.nome}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-center w-full">
          <button type="button"
                  @click.prevent="emitNew"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            {{!obj_to_edit ? 'Criar' : 'Adicionar'}}
          </button>
        </div>
      </div>
    </div>
  </form>
  <hr class="mt-5 mb-10">

</template>