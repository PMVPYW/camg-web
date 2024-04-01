<script setup>
import {ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";

const props = defineProps(["obj_to_edit"])
const emit = defineEmits(["create", "edit"])

const nome = ref(props.obj_to_edit?.nome);
const url = ref(props.obj_to_edit?.url);
const rally = ref(props.obj_to_edit?.rally);
const photo_url = ref(null);
const rallyStore=useRallyStore();


const emitPatrocinio = ()=>{
  const obj = {
    "nome": nome.value,
    "url" : url.value,
    "rally_id" : rally.value,

  };
  if (photo_url.value != null)
  {
    obj["photo_url"] = photo_url.value
  }
  emit(props.obj_to_edit ? 'edit' : "create", obj);
}
</script>

<template>
  <hr class="mt-10 mb-5">
  <form class="m-2">
    <div class="flex justify-center w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-10/12">
        <div>
          <label class="block mb-2 text-base font-medium ">Nome</label>
          <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome do Patrocinio">
        </div>

        <div>
          <label class="block mb-2 text-base font-medium">Link</label>
          <input type="text" required v-model="url" class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Link">
        </div>
      </div>
    </div>
    <br>
      <div class="flex justify-center w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-10/12">
          <div class="mb-4 sm:mb-8">
            <label class="block mb-2 text-base font-medium">Logo</label>
            <input type="file" accept="image/png, image/gif, image/jpeg"
                   class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm file:hidden"
                   @change="$event.target.files[0].size < 1048576 ? photo_url = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
          </div>
          <div class="mb-4 sm:mb-8">
            <label class="block mb-2 text-base font-medium">Rally</label>
            <select v-model="rally" id="af-submit-app-category" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option selected></option>
              <option v-for="rally in rallyStore.rallies" :value="rally.id">{{rally.nome}}</option>
            </select>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <button type="submit"
              @click.prevent="emitPatrocinio"
              class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        {{ props.obj_to_edit ? 'Editar' : 'Criar' }}
      </button>
    </div>
  </form>
  <hr class="mt-5 mb-10">
</template>