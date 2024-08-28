<script setup>

import Contacto from "@/components/Contactos/Contacto.vue";
import {ref, watch} from "vue";
import {useContactoStore} from "@/stores/contacto.js";

const props = defineProps(["tipoContacto", "filteredContacts", "selectedContacto"]);
const emit = defineEmits(["selectedContacto"]);
const editTypeContact= ref(false);
const contactoStore=useContactoStore();
const nome = ref(props.tipoContacto.nome);
const errors = ref(null);


const editType = async (id)=>{
 const data ={}
 if(nome.value!=null){
  data["nome"]=nome.value;
  const result= await contactoStore.editTipoContacto(data,id);
  if (result) {
   errors.value = result;
   console.warn(errors.value, "errors_crud")
  }else{
   errors.value=null;
  }
 }
}

function emit_contact(contacto){
 console.log(contacto);
 emit('selectedContacto', contacto);
}



</script>
<template>
 <div class="flex flex-row items-center mb-6 mx-10">
  <label v-if="editTypeContact===false" class="text-black text-3xl font bold">{{tipoContacto.nome}}</label>
  <input v-if="editTypeContact===true" v-model="nome" type="text" class="py-3 px-4 block w-1/6 border border-gray-200 bg-gray-100 rounded-lg text-lg">
  <button v-if="editTypeContact===false" @click="contactoStore.deleteTipoContacto(tipoContacto.id)" class="p-2 mx-4 px-4 md:w-1/12 sm:w-full text-center opacity-85 my-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 justify-center">
   Eliminar
  </button>
  <button v-if="editTypeContact===false" @click="editTypeContact=!editTypeContact" class="p-2 mx-4 px-4 md:w-1/12 sm:w-full justify-center opacity-85 my-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
   Editar
  </button>
  <button v-if="editTypeContact===true" @click="()=>{editType(tipoContacto.id);editTypeContact=!editTypeContact;}" class="p-2 px-4 mx-4 md:w-1/12 sm:w-full justify-center opacity-85 my-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
   Editar
  </button>
  <button v-if="editTypeContact===true" @click="()=>{editTypeContact=!editTypeContact}" class="p-2 mx-4 px-4 md:w-1/12 sm:w-full text-center opacity-85 my-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 justify-center">
   Fechar
  </button>
 </div>
 <h1 v-if="errors" class="mx-10 text-red-600 text-base font-medium">{{errors.nome[0]}}</h1>
 <div v-for="contacto in filteredContacts" class="flex flex-row justify-center">
  <Contacto v-if="contacto.tipocontacto_id==tipoContacto.id" :key="contacto.id" @click="()=>{emit_contact(contacto)}" :contacto="contacto" class="border rounded-xl w-10/12" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': props.selectedContacto.id==contacto.id}"></Contacto>
 </div>
</template>