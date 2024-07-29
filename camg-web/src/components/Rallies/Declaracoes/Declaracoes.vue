<script setup>
import {Icon} from "@iconify/vue";
import {useRallyStore} from "@/stores/rally.js";
import {ref, watch, reactive} from "vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import CreateDeclaracaoForm from "@/components/Rallies/Declaracoes/CreateDeclaracaoForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import {useDeclaracaoStore} from "@/stores/declaracao.js";
import Declaracao from "@/components/Rallies/Declaracoes/Declaracao.vue";

const selectedDeclaracao = ref({});
const rally_id = ref('');

const declaracaoStore = useDeclaracaoStore();
const rallyStore =useRallyStore();

//filters
const filters = reactive({search: "", select: '', order: 'nome_asc', search_outro: ""})

watch(filters, (new_value) => {
  declaracaoStore.loadDeclaracoes({filters: filters})
})

</script>

<template>
  <div v-if="rallyStore.rally_selected" class="w-full h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Declarações</h1>
    <CrudButtons :create_callback="declaracaoStore.createDeclaracao" :create_form="CreateDeclaracaoForm"
                 :edit_callback="declaracaoStore.editDeclaracao" :obj_to_edit="selectedDeclaracao"
                 :delete_callback="declaracaoStore.deleteDeclaracao" :delete_form="SimpleDeleteForm" @clearSelected="selectedDeclaracao = {}"></CrudButtons>
    <div  class="w-11/12 my-14 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
      <div class="flex bg-[#f8f9fe] justify-center w-full h-16">
        <div class="flex flex-row flex-wrap items-center justify-between w-5/6">
          <div class="flex flex-row w-2/6 w-min-16 my-1">
            <input type="text" required v-model="filters.search" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
          </div>
          <div class="flex flex-row items-center my-1 w-1/4">
            <label class="block mx-4 text-base font-medium">Ordenar:</label>
            <select v-model="filters.order" class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option class="uppercase" value="nome_asc">Nome de A-Z</option>
              <option class="uppercase" value="nome_desc">Nome de Z-A</option>
              <option class="uppercase" value="cargo_asc">Cargo de A-Z</option>
              <option class="uppercase" value="cargo_desc">Cargo de Z-A</option>
            </select>
          </div>
          <div class="flex flex-col items-end w-1/4">
            <div class="flex flex-row items-center my-1 w-full justify-end">
              <label class="block mx-4 text-base font-medium">Cargo:</label>
              <select v-model="filters.select" class="uppercase font-bold py-3 px-4 block w-10/12 border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option :selected="filters.select==''" :value="''">---</option>
                <option class="uppercase" value="outro">Outro</option>
                <option class="uppercase" value="presidente">Presidente</option>
                <option class="uppercase" value="piloto">Piloto</option>
                <option class="uppercase" value="copiloto">Copiloto</option>
              </select>
            </div>
            <div v-if="filters.select === 'outro'" class="flex flex-row items-center my-1 w-[81%] justify-end">
              <input type="text" required v-model="filters.search_outro" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar por outro">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500 h-full overflow-x-hidden">
      <div class="flex flex-wrap -mx-3 removable mt-10 h-full">
        <Declaracao v-for="declaracao in declaracaoStore.declaracoes_filtered" :key="declaracao.id" @click="()=>{selectedDeclaracao = declaracao}" :declaracao="declaracao" class="border-2 rounded-xl w-full h-screen" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedDeclaracao.id==declaracao.id}"></Declaracao>
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
