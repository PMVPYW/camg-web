<script setup>
import CrudButtons from "@/components/common/crudButtons.vue";
import {ref, watch, reactive} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import {useDiretoStore} from "@/stores/direto.js";
import {Icon} from "@iconify/vue";
import CreateDiretoForm from "@/components/Diretos/CreateDiretoForm.vue";

//Stores
const rallyStore=useRallyStore();
const diretoStore=useDiretoStore();

const selectedDireto = ref({});
const rally_id = ref('');

const selectedDiretoIndex = ref(null);


//filters
const filters = reactive({search: "", status: 'all', rally_id: rally_id})

watch(filters, (new_value) => {
 diretoStore.loadDiretos({filters: filters})
})


function toggleVisibility(index) {
 diretoStore.diretos.forEach((direto, i) => {
  if(index == i){
   const direto = diretoStore.diretos[index];
   const newVisibility = direto.visivel == 1 ? 0 : 1;
   console.log(newVisibility)
   diretoStore.editDireto({ 'visivel': newVisibility }, direto.id)
  }else {
   direto.visivel = 0
  }
 });
}


</script>
<template>
 <div class="w-10/12 h-full rounded-xl transition-all duration-200 mx-auto overflow-x-hidden" id="panel">
  <h1 class="text-2xl font-bold ml-10 mt-10">Diretos</h1>
  <CrudButtons :create_callback="diretoStore.createDireto" :create_form="CreateDiretoForm"
         :edit_callback="diretoStore.editDireto" :obj_to_edit="selectedDireto"
         :delete_callback="diretoStore.deleteDireto" :delete_form="SimpleDeleteForm"
         @clearSelected="selectedDireto = {}"></CrudButtons>
  <div class="w-11/12 my-14 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
   <div class="flex bg-[#f8f9fe] justify-center w-full h-16">
    <div class="flex flex-row flex-wrap items-center justify-between w-5/6">
     <div class="flex flex-row w-2/6 w-min-16 my-1">
      <input type="text" required v-model="filters.search" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Procurar">
     </div>
     <div class="flex flex-row items-center my-1">
      <label class="block mx-4 text-base font-medium">Filtrar:</label>
      <select v-model="filters.status" class="capitalize font-bold py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500">
       <option value="enable">Visíveis</option>
       <option value="disable">Não Visíveis</option>
       <option value="all">---</option>
      </select>
     </div>
     <div class="flex flex-row items-center my-1">
      <label class="block mx-4 text-base font-medium">Rally:</label>
      <select v-model="rally_id" class="font-bold py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500">
       <option :selected="rally_id==''" :value="''">---</option>
       <option v-for="rally in rallyStore.rallies" :value="rally.id">{{ rally.nome }}
       </option>
      </select>
     </div>
    </div>
   </div>
  </div>
  <!-- Table -->
  <div v-if="diretoStore.diretos?.length" class="w-11/12 p-1 border-2 border-gray-300 rounded-xl mx-auto m-10">
   <table class="w-full text-left whitespace-nowrap bg-gray-100">
    <!-- Table head -->
    <thead class="bg-neutral-50">
    <tr>
     <th scope="col" class="pl-8 py-4">
      Ver Detalhes
     </th>
     <th scope="col" class="pr-6 py-4">
      Nome
     </th>
     <th scope="col" class="px-6 py-4 max-w-24">
      Link
     </th>
     <th scope="col" class="px-6 py-4 ">
      Nome do Rally
     </th>
     <th scope="col" class="px-6 py-4 ">
      Visível
     </th>
    </tr>
    </thead>

    <!-- Table body -->
    <tbody v-for="(direto, index) in diretoStore.diretos">
    <tr @click="selectedDireto=direto" class=" hover:bg-neutral-100" :class="{'bg-neutral-50': index % 2 === 1, 'border-4 border-amber-400 ' : selectedDireto===direto}">
     <th scope="row" class="pl-20 py-2">
      <button class="hover:bg-gray-100 rounded-full py-3 px-4" @click="()=>{selectedDiretoIndex = selectedDiretoIndex!==index ? index : null}">
       <Icon v-if="selectedDiretoIndex !== null && selectedDiretoIndex === index" icon="mingcute:up-line" class="min-w-6 min-h-6"></Icon>
       <Icon v-else icon="mingcute:down-line" class="min-w-6 min-h-6"></Icon>
      </button>
     </th>
     <td class="pr-6 py-4">{{direto.nome}}</td>
     <td class="px-6 py-4"><p class="text-ellipsis overflow-hidden min-w-14 max-w-96">{{ direto.link }}</p></td>
     <td class="px-6 py-4">{{ direto.rally_id == null ? '-----' : direto.rally_id.nome}}</td>
     <td class="px-6 py-4 space-x-1">
      <div class="flex items-center">
       <input :checked="direto.visivel === 1" @change="()=>{toggleVisibility(index); console.log('teste',direto.visivel)}" type="checkbox" class="relative w-11 h-6 p-px bg-gray-300 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-amber-300 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-amber-300 checked:border-amber-300 focus:checked:border-amber-300
         before:inline-block before:size-5 before:bg-white checked:before:bg-amber-100 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 ">
      </div>
     </td>
    </tr>
    <tr v-if="selectedDiretoIndex !== null && selectedDiretoIndex === index" class="h-full w-full">
     <th colspan="5" class="h-screen w-full">
      <iframe class="object-contain p-24" :src=direto.link height="100%" width="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
     </th>
    </tr>
    </tbody>
   </table>
  </div>
 </div>
</template>
