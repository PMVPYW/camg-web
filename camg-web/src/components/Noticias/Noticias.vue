<script setup>
import CreatePatrocinioForm from "@/components/Rallies/Patrocinios/CreatePatrocinioForm.vue";
import Noticia from "@/components/Noticias/Noticia.vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import {useNoticiaStore} from "@/stores/noticia.js";
import {ref, watch, reactive} from "vue";
import CreateNoticiaForm from "@/components/Noticias/CreateNoticiaForm.vue";
import DeleteNoticiaForm from "@/components/Noticias/DeleteNoticiaForm.vue";
import {useRallyStore} from "@/stores/rally.js";
import CreateDeclaracaoForm from "@/components/Rallies/Declaracoes/CreateDeclaracaoForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import Historia from "@/components/Historias/Historia.vue";

//Stores
const noticiaStore=useNoticiaStore();
const rallyStore=useRallyStore();

const selectedNoticia = ref({});
const rally_id = ref('');


//filters
const filters = reactive({search: "", data_inicio: '', data_fim: '', order: 'titulo_asc', rally_id: rally_id})

watch(filters, (new_value) => {
  noticiaStore.loadNoticias({filters: filters})
})



</script>
<template>
  <div class="w-10/12 h-full rounded-xl transition-all duration-200 mx-auto overflow-x-hidden" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Noticias</h1>
    <CrudButtons :create_callback="noticiaStore.createNoticia" :create_form="CreateNoticiaForm"
                 :edit_callback="noticiaStore.editNoticia" :obj_to_edit="selectedNoticia"
                 :delete_callback="noticiaStore.deleteNoticia" :delete_form="DeleteNoticiaForm"
                 @clearSelected="selectedNoticia = {}"></CrudButtons>
    <div  class="w-11/12 my-14 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
      <div class="flex bg-[#f8f9fe] justify-center w-full h-16">
        <div class="flex flex-row flex-wrap items-center justify-between w-5/6">
          <div class="flex flex-row w-2/6 w-min-16 my-1">
            <input type="text" required v-model="filters.search" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
          </div>
          <div class="flex flex-row items-center my-1">
            <label class="block mx-4 text-base font-medium">De:</label>
            <input v-model="filters.data_inicio" type="date" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
          </div>
          <div class="flex flex-row items-center my-1">
            <label class="block mx-4 text-base font-medium">Até:</label>
            <input v-model="filters.data_fim" type="date" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
          </div>
          <div class="flex flex-row items-center my-1">
            <label class="block mx-4 text-base font-medium">Ordenar:</label>
            <select v-model="filters.order" class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option class="uppercase" value="titulo_asc">A-Z</option>
              <option class="uppercase" value="titulo_desc">Z-a</option>
              <option class="uppercase" value="date_desc">Data mais recente</option>
              <option class="uppercase" value="date_asc">Data menos recente</option>
            </select>
          </div>
          <div class="flex flex-row items-center my-1">
            <label class="block mx-4 text-base font-medium">Rally:</label>
            <select v-model="rally_id" class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option :selected="rally_id==''" :value="''">---</option>
              <option class="uppercase" v-for="rally in rallyStore.rallies" :value="rally.id">{{ rally.nome }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500 h-full">
      <div class="flex flex-wrap mx-3 mt-10 h-full w-full">
        <Noticia v-for="noticia in noticiaStore.noticias_filtered" :key="noticia.id" @click="()=>{selectedNoticia = noticia}" :noticia="noticia" class="border-2 rounded-xl h-screen w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedNoticia.id==noticia.id}"></Noticia>
      </div>
    </div>
  </div>
</template>
