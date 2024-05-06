<script setup xmlns="http://www.w3.org/1999/html">
import {watch, inject, ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {usePatrocinioOficialStore} from "@/stores/patrocinioOficial.js";

const serverBaseUrl = inject("serverBaseUrl");


const props = defineProps(["obj_to_edit"])

const nome = ref(props.obj_to_edit?.entidade_id.nome);
const url = ref(props.obj_to_edit?.entidade_id.url);
const relevancia = ref(props.obj_to_edit?.relevancia);


const photo_url = ref(null);
const rallyStore=useRallyStore();
const patrocinioOficialStore = usePatrocinioOficialStore();

const selected = ref(false);
const creating = ref(false);

const filteredEntities = ref(patrocinioOficialStore.patrociniosOficiaisSemAssociacao);

watch(()=>props.obj_to_edit, (newObject)=>{
  nome.value=newObject.nome;
  url.value=newObject.url;
});


function createPatrocinio() {
  console.log("Entrou na fuction",creating.value)
  if(creating.value === true){
    const obj_entidade = {
      "nome": nome.value,
      "url": url.value,
      "rally_id": rallyStore.rally_selected,
      "entidade_oficial": 1
    };
    if (photo_url.value != null) {
      obj_entidade["photo_url"] = photo_url.value
    }
    console.log("Objeto Entidade",obj_entidade)
    patrocinioOficialStore.createEntidade_PatrocinioOficial(obj_entidade)
  }else{
      if(selected.value == false){
        patrocinioOficialStore.loadPatrociniosOficiais({})
      }else{
        const obj_patrocinio = {
          "entidade_id": selected.value,
          "rally_id": rallyStore.rally_selected,
          "entidade_oficial": 1
        }
        console.log("Objeto Patrocinio",obj_patrocinio)
        patrocinioOficialStore.associarPatrocinioOficial(obj_patrocinio)
      }
  }
}


function searchEntities() {
  const regex = new RegExp(nome.value, 'i');
  const patrocinioSemAssociacao = patrocinioOficialStore.patrociniosOficiaisSemAssociacao;
  filteredEntities.value = patrocinioSemAssociacao.filter(entity => regex.test(entity.nome));
  console.log(filteredEntities);
}


</script>

<template>
  <form class="m-2">
    <div class="flex flex-row">
      <div>
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12">
            <div>
              <label class="block mb-2 text-base font-medium">Nome</label>
              <input type="text" required v-model="nome" @input="searchEntities" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome Patrocinio">
            </div>
            <div v-if="creating">
              <label class="block mb-2 text-base font-medium">Relevância</label>
              <input type="number" required v-model="relevancia" class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Relevância">
            </div>
          </div>
        </div>
        <br>
        <div v-if="creating" class="flex justify-center w-full">
          <div class="mb-4 sm:mb-8 w-11/12">
            <label class="block mb-2 text-base font-medium">Logo</label>
            <input type="file" accept="image/png, image/gif, image/jpeg"
                   class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm file:hidden"
                   @change="$event.target.files[0].size < 1048576 ? photo_url = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
          </div>
        </div>
        <div v-if="creating" class="flex justify-center w-full">
          <div class="mb-4 sm:mb-8 w-11/12">
            <label class="block mb-2 text-base font-medium">Link</label>
            <input type="text" required v-model="url" class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Link">            </div>
        </div>
        <div class="flex justify-center w-full">
          <button type="button"
                  @click="createPatrocinio"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            {{creating ? 'Criar' : 'Adicionar'}}
          </button>
        </div>
      </div>
      <div class="flex flex-col ml-10">
        <h1 class="block mb-2 text-lg font-medium">Entidades</h1>
        <div class="flex flex-row items-center">
            <div v-for="entidade in filteredEntities">
              <div v-if="!creating" @click="()=>{nome=entidade.nome; selected=entidade.id;}" :class="{'border-4 opacity-80': selected == entidade.id}" class="flex bg-white w-28 h-28 m-1 border border-gray-300 rounded-xl">
                  <img :src="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`" :alt="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`"
                       class="my-auto mx-auto w-24 shadow-soft-2xl" >
              </div>
              <div v-if="creating" class="flex bg-white w-28 h-28 m-1 border border-gray-300 rounded-xl">
                <img :src="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`" :alt="`${serverBaseUrl}/storage/entidades/${entidade.photo_url}`"
                     class="my-auto mx-auto w-24 shadow-soft-2xl">
              </div>
            </div>
        </div>
        <div class="flex flex-row">
          <button @click="()=>{creating=!creating; selected=!selected}" v-if="!creating" type="button"
                  class="opacity-85 my-2 mx-2 py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
             Criar Entidade
          </button>
          <button @click="()=>{creating=!creating; selected=!selected}" v-else type="button"
                  class="opacity-85 my-2 mx-2 py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Associar Entidade
          </button>
          <button type="button" @click="()=>{patrocinioOficialStore.deleteEntidadeOficial()} "
                  class="opacity-85 my-2 mx-2 py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Remover Entidades
          </button>
        </div>
      </div>
    </div>
  </form>
</template>