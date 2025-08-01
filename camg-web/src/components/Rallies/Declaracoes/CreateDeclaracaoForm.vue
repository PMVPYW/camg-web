<script setup>
import {inject, onMounted, ref, watch} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {useToast} from "vue-toastification";
import {Icon} from "@iconify/vue";
import {useDeclaracaoStore} from "@/stores/declaracao.js";

const props = defineProps(["obj_to_edit","errors", "editing"]);
const emit = defineEmits(["create", "edit"]);
const serverBaseUrl = inject("serverBaseUrl");
const toast = useToast;

const rallyStore = useRallyStore();
const declaracaoStore = useDeclaracaoStore();

const nome = ref(props.obj_to_edit?.nome);
const conteudo = ref(props.obj_to_edit?.conteudo);
const cargo = ref(props.obj_to_edit?.cargo);
const entidade_equipa = ref(props.obj_to_edit?.entidade_equipa);
const photo_url = ref(props.obj_to_edit?.photo_url || null);
const pontos = ref(props.obj_to_edit?.pontos);
const isChecked = ref(props.obj_to_edit?.pontos ? true : false);
const isOutro = ref(props.obj_to_edit?.cargo!=='Piloto'
          && props.obj_to_edit?.cargo!=='Copiloto'
          && props.obj_to_edit?.cargo!=='Presidente' ? true : false);



const errors = ref(props.errors ?? {})


watch(()=>props.errors, (n_errors)=>{
 errors.value = n_errors ?? {};
})


const emitNew = () => {
 const obj = {
  "nome": nome.value,
  "conteudo": conteudo.value,
  "cargo": cargo.value,
  "rally_id": rallyStore.rally_selected,
  "photo_url": photo_url.value
 };

 if (pontos.value != null) {
  obj["pontos"] = pontos.value
 }
 if (entidade_equipa.value != null) {
  obj["entidade_equipa"] = entidade_equipa.value
 }
 emit(props.obj_to_edit && props.editing === true ? 'edit' : "create", obj);
}


//preview image
function previewPhoto(photo){
 const file = photo_url;
 const preview = document.getElementById('file-preview');
 if (photo){
  preview.setAttribute('src', photo);
 }else{
  if(file) {
   const fileReader = new FileReader();
   fileReader.onload = function (event) {
    preview.setAttribute('src', event.target.result);
   }
   fileReader.readAsDataURL(file.value);
  }
 }
}

function handleFileChange(event) {
 const file = event.target.files[0];
 const reader = new FileReader();
 photo_url.value = file;

 reader.onload = () => {
  preview.setAttribute('src', reader.result);
 };
 const preview = document.getElementById('file-preview');
 if (file) {
  reader.readAsDataURL(file);
 }
}

onMounted(()=>{
 if(photo_url.value){
  previewPhoto(`${serverBaseUrl}/storage/declaracoes/${photo_url.value}`);
 }
})


</script>
<template>
 <hr class="my-6">
 <form class="m-2">
  <div class="flex flex-row">
   <div class="w-full">
    <div class="flex flex-col items-center w-full">
     <div class="flex justify-center w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-7/12">
       <div>
        <label class="block mb-2 text-base font-medium">Nome<label class="text-red-600 ml-1">*</label></label>
        <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Nome do Autor">
        <h1 v-if="errors.nome" class="text-red-600 text-base font-medium">{{errors.nome[0]}}</h1>
       </div>
       <div>
        <label class="block mb-2 text-base font-medium">Imagem<label class="text-red-600 ml-1">*</label></label>
        <input type="file" accept="image/png, image/gif, image/jpeg"
            class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 file:hidden"
            @change="handleFileChange">
        <h1 v-if="errors.photo_url" class="text-red-600 text-base font-medium">{{errors.photo_url[0]}}</h1>
       </div>
       <div>
        <label class="block mb-2 text-base font-medium">Cargo<label class="text-red-600 ml-1">*</label></label>
        <select v-model="cargo" @change="()=>{cargo==='' ? isOutro=true : isOutro= false}" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500">
         <option value="Presidente">Presidente</option>
         <option value="Piloto">Piloto</option>
         <option value="Copiloto">Copiloto</option>
         <option value="">Outro</option>
        </select>
        <input v-if="isOutro" type="text" v-model="cargo" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 my-2" placeholder="Cargo">
        <h1 v-if="errors.cargo" class="text-red-600 text-base font-medium">{{errors.cargo[0]}}</h1>
       </div>
       <div>
        <label class="block mb-2 text-base font-medium">Entidade/Equipa</label>
        <input type="text" required v-model="entidade_equipa" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Entidade/Equipa">
       </div>
      </div>
      <div class="w-[16.5%]">
       <div class="w-11/12 max-h-64 h-full ml-8 rounded-2xl border-4 border-gray-300">
        <Icon v-if="!photo_url" class="flex text-2xl text-gray-500 min-w-20 min-h-20 h-full mx-auto my-auto" icon="f7:photo" />
        <img v-show="photo_url" src="#" id="file-preview" class="w-full h-full mx-auto my-auto object-contain max-h-72 shadow-soft-2xl">
       </div>
      </div>
     </div>
     <div class="w-9/12 mt-6">
      <label for="about" class="block mb-2 text-base font-medium">Conteúdo<label class="text-red-600 ml-1">*</label></label>
      <textarea id="about" required v-model="conteudo" rows="3" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"></textarea>
      <h1 v-if="errors.conteudo" class="text-red-600 text-base font-medium">{{errors.conteudo[0]}}</h1>
     </div>
     <div class="flex flex-row w-9/12 mt-6 items-center justify-between">
      <div class="flex">
       <div class="flex items-center">
        <label class="block mb-2 text-base font-medium">Atribuir pontuação</label>
        <input type="checkbox" required v-model="isChecked" class="py-2 px-2 mx-2 font-bold w-6 h-6 bg-gray-100 rounded-lg text-sm">
       </div>
       <div v-if="isChecked" class="flex items-center mx-4">
        <input type="number" required v-model="pontos" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Pontuação">
       </div>
      </div>
      <div v-if="!props.editing" class="flex items-center">
       <input v-model="declaracaoStore.declaracao_createNotifications" type="checkbox" class="relative w-11 h-6 p-px bg-gray-300 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-amber-300 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-amber-300 checked:border-amber-300 focus:checked:border-amber-300
        before:inline-block before:size-5 before:bg-white checked:before:bg-amber-100 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 ">
       <label for="hs-small-switch" class="text-md text-gray-800 ms-3 font-bold">Enviar Notificações</label>
      </div>
     </div>
      <div class="w-9/12 mx-auto my-4">
        <label class="block mb-2 text-base font-medium text-red-600">*<label class="text-red-600 ml-1">Campos Obrigatórios</label></label>
      </div>
    </div>
    <br>
    <div class="flex justify-center w-full mt-8">
     <button
       type="button"
       @click="emitNew"
       class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
     >
      {{
       props.obj_to_edit && props.editing === true
         ? "Editar"
         : "Criar"
      }}
     </button>
    </div>
   </div>
  </div>
 </form>
 <hr class="my-6">
</template>