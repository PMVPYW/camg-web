<script setup>
import {Icon} from "@iconify/vue";
import {useRallyStore} from "@/stores/rally.js";
import {ref, watch, reactive} from "vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import CreateDeclaracaoForm from "@/components/Rallies/Declaracoes/CreateDeclaracaoForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";

const selectedDeclaracao = ref({});
const rally_id = ref('');


//filters
const filters = reactive({search: "", data_inicio: '', data_fim: '', order: 'titulo_asc'})

watch(filters, (new_value) => {
  noticiaStore.loadNoticias({filters: filters})
})

const rallyStore =useRallyStore();
</script>

<template>
  <div v-if="rallyStore.rally_selected" class="h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Declarações</h1>
    <CrudButtons :create_form="CreateDeclaracaoForm"
                 :obj_to_edit="selectedDeclaracao"
                 :delete_form="SimpleDeleteForm"
                 @clearSelected="selectedDeclaracao = {}"></CrudButtons>
    <div  class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
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
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10 h-screen overflow-y-auto">
        <Declarecoes v-for="declaracao in " :key="declaracao.id" @click="()=>{selectedDeclaracao = declaracao}" :declaracao="declaracao" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedDeclaracao.id==declaracao.id}"></Declarecoes>
      </div>
    </div>
  </div>
  <div v-else class="mx-auto mt-12">
    <div class="flex flex-row items-center bg-gray-100 border border-amber-400 py-2 px-4 rounded-xl">
      <h1 class="text-gray-500 text-base font-medium">
        Não existem rallys, para ver as declarações de um rally terá que o criar primeiro!
      </h1>
      <div>
        <router-link :to="{ name: 'rallies' }" class="py-2.7 h-10 text-sm ease-nav-brand my-0 mx-4 flex  items-center whitespace-nowrap rounded-lg  px-4 font-semibold text-slate-700 transition-colors bg-white shadow-xl">
          <div class="bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1">
            <Icon icon="mdi:car-traction-control" class="min-w-5 min-h-5 text-white">
              <title>Criar Rally</title>
            </Icon>
          </div>
          <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Criar Rally</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
