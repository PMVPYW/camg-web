<script setup>

import {useContactoStore} from "@/stores/contacto.js";
import {ref, watch} from "vue";

const contactoStore=useContactoStore();
const nome = ref(null);
const errors = ref(null);



const createTypeContact = async ()=>{
 const data ={}
  if(nome.value!=null){
   data["nome"]=nome.value;
   const result = await contactoStore.createTipoContacto(data);
   if (result) {
    errors.value = result;
    console.warn(errors.value, "errors_crud")
   }else{
    errors.value=null;
   }
  }
};
</script>
<template>
  <hr class="my-6">
  <form class="m-2">
  <div class="flex flex-row w-full">
   <div class="w-full">
    <div class="flex flex-col items-center justify-center w-full">
     <div class="w-7/12 my-4">
      <label class="block mb-2 text-base font-medium">Nome</label>
      <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Nome Tipo">
      <h1 v-if="errors" class="text-red-600 text-base font-medium">{{errors.nome[0]}}</h1>
     </div>
     <a @click="createTypeContact" class="md:w-2/12 sm:w-full text-center opacity-85 my-2 mx-2 py-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600 justify-center">Criar</a>
    <br>
   </div>
  </div>
  </div>
 </form>
 <hr class="my-6">
</template>