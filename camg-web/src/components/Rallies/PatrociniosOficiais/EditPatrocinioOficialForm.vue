<script setup xmlns="http://www.w3.org/1999/html">
import {inject, ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {usePatrocinioOficialStore} from "@/stores/patrocinioOficial.js";

const serverBaseUrl = inject("serverBaseUrl");


const props = defineProps(["obj_to_edit"])

const nome = ref(props.obj_to_edit?.entidade_id.nome);
const url = ref(props.obj_to_edit?.entidade_id.url);

const photo_url = ref(null);
const rallyStore=useRallyStore();
const patrocinioOficialStore= usePatrocinioOficialStore();

const selected = ref(false);
const creating = ref(false);


function editEntidade() {
    const obj_entidade = {
      "nome": nome.value,
      "url": url.value,
    };
    if (photo_url.value != null) {
      obj_entidade["photo_url"] = photo_url.value
    }
  patrocinioOficialStore.editEntidadeOficial(props.obj_to_edit.entidade_id.id,obj_entidade)
  }

</script>

<template>
  <form class="m-2">
    <div class="flex flex-row">
      <div>
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 mt-16">
            <div>
              <label class="block mb-2 text-base font-medium ">Nome</label>
              <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome Patrocinio">
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Link</label>
              <input type="text" required v-model="url" class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Link">
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-center w-full">
          <button type="button"
                  @click="editEntidade"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Editar
          </button>
        </div>
      </div>
      <div class="flex flex-col ml-10">
        <div class="flex flex-col items-center">
          <div class="flex bg-white w-44 h-44 mb-2 border border-gray-300 rounded-xl">
            <img :src="`${serverBaseUrl}/storage/entidades/${props.obj_to_edit.entidade_id.photo_url}`" :alt="`${props.obj_to_edit.entidade_id.photo_url}`"
                 class="my-auto mx-auto w-40 shadow-soft-2xl">
          </div>
          <input type="file" accept="image/png, image/gif, image/jpeg"
                 class="py-3 px-4 block w-9/12 border border-gray-200 bg-gray-100 rounded-lg text-sm file:hidden"
                 @change="$event.target.files[0].size < 1048576 ? photo_url = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
        </div>
      </div>
    </div>
  </form>
</template>