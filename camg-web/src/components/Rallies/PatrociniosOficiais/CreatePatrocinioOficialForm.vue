<script setup xmlns="http://www.w3.org/1999/html">
import {watch, inject, ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioOficialStore} from "@/stores/patrocinioOficial.js";

const serverBaseUrl = inject("serverBaseUrl");


const props = defineProps(["obj_to_edit"])

const nome = ref(props.obj_to_edit?.entidade_id.nome);
const url = ref(props.obj_to_edit?.entidade_id.url);
const relevancia = ref(1);


const photo_url = ref(null);
const rallyStore=useRallyStore();
const patrocinioOficialStore = usePatrocinioOficialStore();

const selected = ref(false);
const creating = ref(false);

const filteredEntities = ref(patrocinioOficialStore.patrociniosOficiaisSemAssociacao);
const errors = ref({});


const createPatrocinio = async () => {
 console.log("Entrou na fuction",creating.value)
 if(creating.value === true){
  const obj_entidade = {
   "nome": nome.value,
   "url": url.value,
   "rally_id": rallyStore.rally_selected,
   "entidade_oficial": 1,
   "relevancia": 10
  };
  if (photo_url.value != null) {
   obj_entidade["photo_url"] = photo_url.value
  }
  console.log("Objeto Entidade",obj_entidade)
  const result = await patrocinioOficialStore.createEntidade_PatrocinioOficial(obj_entidade)
  if (result) {
   errors.value = result;
   console.warn(errors.value, "errors_crud")
  }else{
   errors.value={};
  }
 }else{
   if(selected.value == false){
    patrocinioOficialStore.loadPatrociniosOficiais({})
   }else{
    const obj_patrocinio = {
     "relevancia": relevancia.value,
     "entidade_id": selected.value,
     "rally_id": rallyStore.rally_selected,
     "entidade_oficial": 1
    }
    console.log("Objeto Patrocinio",obj_patrocinio)
    const result1 = await patrocinioOficialStore.associarPatrocinioOficial(obj_patrocinio)
    if (result1) {
     errors.value = result1;
     console.warn(errors.value, "errors_crud")
    }else{
     errors.value={};
    }
   }
 }
}


function searchEntities() {
 const regex = new RegExp(nome.value, 'i');
 const patrocinioSemAssociacao = patrocinioOficialStore.patrociniosOficiaisSemAssociacao;
 filteredEntities.value = patrocinioSemAssociacao.filter(entity => regex.test(entity.nome));
 console.log(filteredEntities);
}


</script>

<template>
  <hr class="my-6">
  <form class="m-2">
  <div class="flex flex-row justify-center w-full">
   <div class="w-6/12">
    <div class="flex justify-center w-full">
     <div class="mt-2 w-11/12">
      <label class="block mb-2 text-base font-medium">Nome<label class="text-red-600 ml-1">*</label></label>
      <input type="text" required v-model="nome" @input="searchEntities" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Nome do Patrocínio">
      <h1 v-if="errors.nome" class="text-red-600 text-base font-medium">{{errors.nome[0]}}</h1>
     </div>
    </div>
    <br>
    <div v-if="creating" class="flex justify-center w-full">
     <div class="mb-4 sm:mb-8 w-11/12">
      <label class="block mb-2 text-base font-medium">Logotipo<label class="text-red-600 ml-1">*</label></label>
      <input type="file" accept="image/png, image/gif, image/jpeg"
          class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 file:hidden"
          @change="$event.target.files[0].size < 1048576 ? photo_url = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
      <h1 v-if="errors.photo_url" class="text-red-600 text-base font-medium">{{errors.photo_url[0]}}</h1>
     </div>
    </div>
    <div v-if="creating" class="flex justify-center w-full">
     <div class="mb-4 w-11/12">
      <label class="block mb-2 text-base font-medium">Link<label class="text-red-600 ml-1">*</label></label>
      <input type="text" required v-model="url" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Link do Website da Entidade Oficial">
      <h1 v-if="errors.url" class="text-red-600 text-base font-medium">{{errors.url[0]}}</h1>
     </div>
    </div>
     <div class="w-11/12 mx-auto mb-4">
       <label class="block mb-2 text-base font-medium text-red-600">*<label class="text-red-600 ml-1">Campos Obrigatórios</label></label>
     </div>
    <div class="flex justify-center w-full">
     <button type="button"
         @click="createPatrocinio"
         class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
      {{creating ? 'Criar' : 'Adicionar'}}
     </button>
    </div>
   </div>
   <div class="flex flex-col ml-10">
    <h1 class="block mb-2 text-lg font-medium">Entidades Oficiais</h1>
    <div class="flex flex-row items-center">
      <div v-for="entidade in filteredEntities">
       <div v-if="!creating" @click="()=>{nome=entidade.nome; selected=entidade.id;}" :class="{'border-4 opacity-80': selected == entidade.id}" class="flex bg-white w-28 h-28 m-1 border border-amber-200 rounded-xl">
         <img :src="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`" :alt="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`"
            class="my-auto mx-auto w-24 shadow-soft-2xl" >
       </div>
       <div v-if="creating" class="flex bg-white w-28 h-28 m-1 border border-amber-200 rounded-xl">
        <img :src="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`" :alt="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`"
           class="my-auto mx-auto w-24 shadow-soft-2xl">
       </div>
      </div>
    </div>
    <div class="flex flex-row">
     <button @click="()=>{creating=!creating; selected=!selected}" v-if="!creating" type="button"
         class="opacity-85 my-2 mx-2 py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
       Criar Entidade Oficial
     </button>
     <button @click="()=>{creating=!creating; selected=!selected}" v-else type="button"
         class="opacity-85 my-2 mx-2 py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
      Associar Entidade Oficial
     </button>
     <button type="button" @click="()=>{patrocinioOficialStore.deleteEntidadeOficial()} "
         class="opacity-85 my-2 mx-2 py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-red-800 border-red-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
      Remover Entidades
     </button>
    </div>
   </div>
  </div>
 </form>
</template>