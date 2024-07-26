<script setup>
import CrudButtons from "@/components/common/crudButtons.vue";
import {ref, watch, reactive} from "vue";
import Contacto from "@/components/Contactos/Contacto.vue";
import {useContactoStore} from "@/stores/contacto.js";
import CreateContactoForm from "@/components/Contactos/CreateContactoForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import { Icon } from '@iconify/vue';
import CreateTipoContactoForm from "@/components/Contactos/CreateTipoContactoForm.vue";
import TipoContacto from "@/components/Contactos/TipoContacto.vue";


//Stores
const contactoStore=useContactoStore();
const selectedContacto= ref({});
const createTypeContact= ref(false);

const filteredContacts = ref(contactoStore.contactos);
const pesquisa= ref(null)

//filters
const filters = reactive({order: 'nome_asc', tipo_contacto_id: ''})

watch(filters, (new_value) => {
  contactoStore.loadTipoContactos({filters: filters})
})


function selected_emit(new_var){
  selectedContacto.value=new_var;
}

function searchContact() {
  const regex = new RegExp(pesquisa.value, 'i');
  var contacts = contactoStore.contactos;
  filteredContacts.value = contacts.filter(contacts => regex.test(contacts.nome)|| regex.test(contacts.valor)||regex.test(contacts.tipo_valor));
}


watch(()=>contactoStore.contactos, (contacto)=>{
  filteredContacts.value=contactoStore.contactos;
});

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
            <input type="text" required v-model="pesquisa" @input="searchContact" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
          </div>
          <div class="flex flex-row items-center">
            <label class="block mx-4 text-base font-medium">Ordenar:</label>
            <select v-model="filters.order" class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option class="uppercase" value="nome_asc">A-Z</option>
              <option class="uppercase" value="nome_desc">Z-a</option>
            </select>
          </div>
          <div class="flex flex-row items-center">
            <label class="block mx-4 text-base font-medium">Tipo:</label>
            <select v-model="filters.tipo_contacto_id" class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option class="uppercase" value="">----</option>
              <option v-for="tipoContacto in contactoStore.tipo_contactos" class="uppercase" :value="tipoContacto.id">{{tipoContacto.nome}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10 justify-center">
        <div v-for="tipoContacto in contactoStore.tipo_contactos_filters" class="w-9/12">
          <TipoContacto :tipoContacto="tipoContacto" :filteredContacts="filteredContacts" @selectedContacto="selected_emit" :selected-contacto="selectedContacto"></TipoContacto>
          <hr class="my-6">
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
      <div>
        <Icon @click="createTypeContact=!createTypeContact" class="w-8 h-8 hover:text-gray-300 mx-4" icon="mingcute:close-line" />
      </div>
      <CreateTipoContactoForm></CreateTipoContactoForm>
    </div>
  </div>
</template>