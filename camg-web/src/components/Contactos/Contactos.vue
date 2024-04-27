<script setup>
import CrudButtons from "@/components/common/crudButtons.vue";
import {ref, watch, reactive} from "vue";
import Contacto from "@/components/Contactos/Contacto.vue";
import {useContactoStore} from "@/stores/contacto.js";
import CreateContactoForm from "@/components/Contactos/CreateContactoForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import { Icon } from '@iconify/vue';
import CreateTipoContactoForm from "@/components/Contactos/CreateTipoContactoForm.vue";


//Stores
const contactoStore=useContactoStore();
const selectedContacto= ref({});
const createTypeContact= ref(false);


//filters
const filters = reactive({search: "", order: 'titulo_asc', tipoContacto: ''})

watch(filters, (new_value) => {
  contactoStore.loadContactos({filters: filters})
})


</script>
<template>
  <div class="w-full h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Contactos</h1>
    <CrudButtons
        :create_callback="contactoStore.createContacto" :create_form="CreateContactoForm"
        :edit_callback="contactoStore.editContacto" :obj_to_edit="selectedContacto"
        :delete_callback="contactoStore.deleteContacto" :delete_form="SimpleDeleteForm"
        @clearSelected="selectedContacto = {}"></CrudButtons>
    <div  class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
      <div class="flex bg-[#f8f9fe] justify-center w-full h-16">
        <div class="flex flex-row items-center justify-between w-5/6">
          <div class="flex flex-row w-2/6">
            <input type="text" required v-model="filters.search" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
          </div>
          <div class="flex flex-row items-center">
            <label class="block mx-4 text-base font-medium">Ordenar:</label>
            <select v-model="filters.order" class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option class="uppercase" value="titulo_asc">A-Z</option>
              <option class="uppercase" value="titulo_desc">Z-a</option>
            </select>
          </div>
          <div class="flex flex-row items-center">
            <label class="block mx-4 text-base font-medium">Tipo:</label>
            <select v-model="filters.tipoContacto" class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option v-for="tipoContacto in contactoStore.tipo_contactos" class="uppercase" :value="tipoContacto.id">{{tipoContacto.nome}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10 justify-center">
        <div v-for="tipoContacto in contactoStore.tipo_contactos" class="w-9/12">
          <div class="flex flex-row justify-between items-center mb-6 mx-10">
            <label class="text-black text-3xl font bold">{{tipoContacto.nome}}</label>
            <button class="p-2 px-4 md:w-1/12 sm:w-full text-center opacity-85 my-2 mx-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 justify-center">
              <Icon class="w-9 h-9 text-white font-bold" icon="game-icons:trash-can" />
            </button>
          </div>
          <div v-for="contacto in contactoStore.contactos" class="flex flex-row justify-center">
            <Contacto v-if="contacto.tipocontacto_id==tipoContacto.id" :key="contacto.id" @click="()=>{selectedContacto = contacto}" :contacto="contacto" class="border rounded-xl w-10/12" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedContacto.id==contacto.id}"></Contacto>
          </div>
        </div>
      </div>
    </div>

    <div v-if="createTypeContact===false" @click="createTypeContact=!createTypeContact" class="flex flex-row justify-center w-9/12 mx-auto m-10">
      <div class="flex border-dashed border-2 border-gray-800 w-full rounded-2xl hover:opacity-50">
        <div class="flex flex-row justify-center items-center w-full p-14">
          <Icon class="text-2xl text-gray-800 mx-2" icon="zondicons:add-outline" />
          <a type="button" class="text-gray-800 text-xl font-bold">Adicionar Novo Tipo de Contacto</a>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center w-9/12 mx-auto m-10">
      <CreateTipoContactoForm></CreateTipoContactoForm>
      <div class="flex flex-row justify-center">
        <a type="button" class="md:w-2/12 sm:w-full text-center opacity-85 my-2 mx-2 py-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 justify-center">Criar</a>
        <a type="button" @click="createTypeContact=!createTypeContact" class="md:w-2/12 sm:w-full text-center opacity-85 my-2 mx-2 py-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 justify-center">Cancelar</a>
      </div>
    </div>
  </div>
</template>