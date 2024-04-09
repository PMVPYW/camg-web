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
const title_img = ref(null);
const data = ref(props.obj_to_edit?.data ? props.obj_to_edit?.data : new Date().toISOString().substring(0, 10));
const rally_id = ref(null);



const photos_id = ref(null);
const rallyStore=useRallyStore();
const patrocinioStore= usePatrocinioStore();
const noticiaStore=useNoticiaStore();


const emitNew = () => {
  const obj = {
    "titulo": titulo.value,
    "conteudo": conteudo.value,
    "data": data.value,
  };
  if (title_img.value != null) {
    obj["title_img"] = title_img.value
  }
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
      <div class="w-full">
        <div class="lg:flex flex-row">
          <div class="flex flex-col justify-center w-5/6 mx-auto">
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
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full my-4">
              <div class="mb-4 sm:mb-8 w-full">
                <label class="block mb-2 text-base font-medium">Imagem</label>
                <input type="file" accept="image/png, image/gif, image/jpeg"
                       class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm file:hidden"
                       @change="$event.target.files[0].size < 1048576 ? title_img = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
              </div>
              <div class="w-5/6">
                <label class="block mb-2 text-base font-medium">Rally</label>
                <select class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                  <option></option>
                  <option class="uppercase" v-for="rally in rallyStore.rallies" :value="rally.id">{{rally.nome}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="sm:block flex flex-col w-full h-80">
            <div class="flex flex-wrap justify-center items-start max-h-full overflow-y-scroll">
              <div class="flex bg-white w-[30%] min-w-36 max-w-48 h-36 m-2 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-2 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-1 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-2 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-1 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48 h-36 m-1 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-1 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-1 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-1 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
              </div>
              <div class="flex bg-white w-[30%] min-w-36 max-w-48  h-36 m-1 border border-gray-300 rounded-xl">
                <div class="my-auto mx-auto min-w-24 shadow-soft-2xl"/>
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