<script setup xmlns="http://www.w3.org/1999/html">
import {inject, ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioOficialStore} from "@/stores/patrocinioOficial.js";

const serverBaseUrl = inject("serverBaseUrl");


const props = defineProps(["obj_to_edit"])

const nome = ref(props.obj_to_edit?.entidade_id.nome);
const url = ref(props.obj_to_edit?.entidade_id.url);
const relevancia = ref(props.obj_to_edit?.relevancia);
const errors = ref({});



const photo_url = ref(null);
const rallyStore=useRallyStore();
const patrocinioOficialStore= usePatrocinioOficialStore();

const selected = ref(false);
const creating = ref(false);


const editEntidade = async () => {
 //Edit Entidade Oficial
 const obj_entidade = {
   "nome": nome.value,
   "url": url.value,
   "relevancia": 10
 };
 if (photo_url.value != null) {
  obj_entidade["photo_url"] = photo_url.value
 }
 const result = await patrocinioOficialStore.editEntidadeOficial(props.obj_to_edit.entidade_id.id, props.obj_to_edit.id,obj_entidade);
  if (result) {
   errors.value = result;
   console.warn(errors.value, "errors_crud")
  }else{
   errors.value={};
  }
 }

</script>

<template>
  <hr class="my-6">
  <form class="m-2">
  <div class="flex flex-row justify-center w-full">
   <div class="w-6/12">
    <div class="flex flex-wrap justify-center w-full">
     <div class="w-11/12">
      <label class="block mb-2 text-base font-medium ">Nome<label class="text-red-600 ml-1">*</label></label>
      <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Nome Patrocinio">
      <h1 v-if="errors.nome" class="text-red-600 text-base font-medium">{{errors.nome[0]}}</h1>
     </div>
     <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6 w-11/12 mt-8">
      <div>
       <label class="block mb-2 text-base font-medium">Link<label class="text-red-600 ml-1">*</label></label>
       <input type="text" required v-model="url" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Link">
       <h1 v-if="errors.url" class="text-red-600 text-base font-medium">{{errors.url[0]}}</h1>
      </div>
     </div>
    </div>
    <br>
     <div class="w-11/12 mx-auto mb-4">
       <label class="block mb-2 text-base font-medium text-red-600">*<label class="text-red-600 ml-1">Campos Obrigatórios</label></label>
     </div>
    <div class="flex justify-center w-full">
     <button type="button"
         @click="editEntidade"
         class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
      Editar
     </button>
    </div>
   </div>
   <div class="flex flex-col ml-10">
    <div class="flex flex-col items-center">
     <div class="flex bg-white w-44 h-44 mb-2 border border-amber-200 rounded-xl">
      <img :src="`${serverBaseUrl}/storage/entidades/${props.obj_to_edit.entidade_id.photo_url}`" :alt="`${props.obj_to_edit.entidade_id.photo_url}`"
         class="my-auto mx-auto w-40 shadow-soft-2xl">
     </div>
     <input type="file" accept="image/png, image/gif, image/jpeg"
         class="py-3 px-4 block w-9/12 border border-amber-200 bg-gray-100 rounded-lg text-sm file:hidden"
         @change="$event.target.files[0].size < 1048576 ? photo_url = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
    </div>
   </div>
  </div>
 </form>
</template>