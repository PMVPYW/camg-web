<script setup>
import CreatePatrocinioForm from "@/components/Rallies/Patrocinios/CreatePatrocinioForm.vue";
import Noticia from "@/components/Noticias/Noticia.vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import {useNoticiaStore} from "@/stores/noticia.js";
import {ref, watch} from "vue";
import CreateNoticiaForm from "@/components/Noticias/CreateNoticiaForm.vue";
import DeleteNoticiaForm from "@/components/Noticias/DeleteNoticiaForm.vue";

const noticiaStore=useNoticiaStore();
const selectedNoticia = ref({});

const filteredNoticias = ref(noticiaStore.noticias);
const pesquisa = ref(null);

watch(()=>noticiaStore.noticias, (noticias)=>{
  filteredNoticias.value=noticias;
});

function searchEntities() {
  const regex = new RegExp(pesquisa.value, 'i');
  const noticias = noticiaStore.noticias;
  filteredNoticias.value = noticias.filter(noticia => regex.test(noticia.titulo));
  console.log(filteredNoticias);
}


</script>
<template>
  <div class="w-full h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Noticias</h1>
    <CrudButtons :create_callback="noticiaStore.createNoticia" :create_form="CreateNoticiaForm"
                 :edit_callback="noticiaStore.editNoticia" :obj_to_edit="selectedNoticia"
                 :delete_callback="noticiaStore.deleteNoticia" :delete_form="DeleteNoticiaForm"
                 @clearSelected="selectedNoticia = {}"></CrudButtons>
    <div  class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
      <div class="flex mx-auto bg-[#f8f9fe] w-full h-16 ">
        <div class="flex flex-row items-center ml-14">
          <div>
            <input type="text" required v-model="pesquisa" @input="searchEntities" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
          </div>
          <label class="block mx-4 text-base font-medium">Ordenar:</label>
          <select class="uppercase font-bold py-3 px-4 block text-slate-700 bg-gray-100 rounded-lg text-xs border-b-2 h-10 border-amber-400">
            <option class="uppercase" value="nome_asc">A-Z</option>
            <option class="uppercase" value="nome_desc">Z-a</option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10">
        <Noticia v-for="noticia in filteredNoticias" :key="noticia.id" @click="()=>{selectedNoticia = noticia}" :noticia="noticia" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedNoticia.id==noticia.id}"></Noticia>
      </div>
    </div>
  </div>
</template>
