<script setup>
import CrudButtons from "@/components/common/crudButtons.vue";
import {ref, watch, reactive} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import Contacto from "@/components/Contactos/Contacto.vue";
import {useContactoStore} from "@/stores/contacto.js";

//Stores
const contactoStore=useContactoStore();

const selectedContacto= ref({});


//filters
const filters = reactive({search: "", data_inicio: '', data_fim: '', order: 'titulo_asc', rally_id: rally_id})

watch(filters, (new_value) => {
  noticiaStore.loadNoticias({filters: filters})
})


</script>
<template>
  <div class="w-full h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Contactos</h1>
    <CrudButtons @clearSelected="selectedNoticia = {}"></CrudButtons>
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
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10">
        <Contacto v-for="noticia in noticiaStore.noticias_filtered" :key="noticia.id" @click="()=>{selectedNoticia = noticia}" :noticia="noticia" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedNoticia.id==noticia.id}"></Contacto>
      </div>
    </div>
  </div>
</template>