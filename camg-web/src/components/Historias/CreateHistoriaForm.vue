<script setup>
import {Icon} from "@iconify/vue";
import {inject, onMounted, ref, watch} from "vue";
import {useToast} from "vue-toastification";
import {useHistoriaStore} from "@/stores/historia.js";

const props = defineProps(["obj_to_edit","errors", "editing"]);
const emit = defineEmits(["create", "edit"]);
const toast = useToast();
const serverBaseUrl = inject("serverBaseUrl");
const historiaStore = useHistoriaStore();

const titulo = ref(props.obj_to_edit?.titulo);
const subtitulo = ref(props.obj_to_edit?.subtitulo);
const conteudo = ref(props.obj_to_edit?.conteudo);
const photo_url = ref(props.obj_to_edit?.photo_url || null);

const numero_etapas = ref(0);
const numero_capitulos = ref(0);
const etapas = ref([]);
const capitulos = ref(props.obj_to_edit?.capitulo ? props.obj_to_edit?.capitulo : []);

const errors = ref(props.errors ?? {});


if(props.obj_to_edit?.capitulo) {
 let max_capitulos_id=0, max_etapa_id=0
 capitulos.value.forEach((capitulo) => {
  max_capitulos_id = max_capitulos_id > capitulo.id ? max_capitulos_id : capitulo.id
  console.log(capitulo.etapas);
  capitulo.etapas.forEach((etapa) => {
   max_etapa_id = max_etapa_id > etapa.id ? max_etapa_id : etapa.id
   etapas.value.push(etapa);
  });
  console.log("Etapas", etapas)
 })
 numero_etapas.value=max_etapa_id;
 numero_capitulos.value=max_capitulos_id;
}

watch(()=>props.errors, (n_errors)=>{
 errors.value = n_errors ?? {};
})


watch(() => props.obj_to_edit, (newValue) => {
 if (newValue) {
  titulo.value = newValue.titulo;
  subtitulo.value = newValue.subtitulo;
  conteudo.value = newValue.conteudo;
  photo_url.value = newValue.photo_url;
  capitulos.value = newValue.capitulos || [];
  etapas.value = newValue.etapas || [];
 }
});


function validated_etapa(capitulo_id){
 let e = etapas.value.filter((item) => item.capitulo_id == capitulo_id);
 if (e && e.length > 0) {
  let t = e[e.length - 1];
  if (!t.nome || !t.ano_inicio) {
   return true;
  }else{
   return false;
  }
 }else{
  return false;
 }
}
function adicionar_etapa(id, capitulo_id){
 console.log("id",id);
 const data = {
  "id": id,
  "capitulo_id": capitulo_id,
  "nome": null,
  "ano_inicio": null,
  "ano_fim": null,
  "edit": props.obj_to_edit && props.editing === true ? true : false
 }
 etapas.value.push(data);
 console.log("etapas", etapas.value)
}

function remover_etapa(id){
 console.log("id",id);
 console.log("filter", etapas.value.filter((item) => item.id != id))
 etapas.value = etapas.value.filter((item) => item.id != id);
 console.log("etapas",etapas.value)
}


function validated_capitulo(){
 let e = capitulos.value;
 if (e && e.length > 0) {
  let t = e[e.length - 1];
  return !t.titulo;
 }else{
  return false;
 }
}
function adicionar_capitulo(id){
 console.log("id",id);
 try {
  if(!capitulos.value){
   capitulos.value = [];
  }
  const data = {
   "id": id,
   "titulo": null,
   "edit": props.obj_to_edit && props.editing === true ? true : false
  }
  capitulos.value.push(data);
 }catch (e) {
  console.log("Error",e);
 }
 console.log("capitulos",capitulos.value)

}

function remover_capitulo(id){
 console.log("ETAPAS",etapas.value)

 console.log("id",id);
 console.log("filter_etapas", etapas.value.filter((item) => item.capitulo_id != id))

 etapas.value = etapas.value.filter((item) => item.capitulo_id != id);
 capitulos.value = capitulos.value.filter((item) => item.id != id);
 console.log("capitulos",capitulos.value)
 console.log("ETAPAS",etapas.value)

}

const emitNew = async () => {
 const obj = {
  "titulo": titulo.value,
  "subtitulo": subtitulo.value,
  "conteudo": conteudo.value,
 };
 if (photo_url.value != null && photo_url.value!=props.obj_to_edit.photo_url) {
  obj["photo_url"] = photo_url.value
 }
 if (etapas.value != null) {
  obj["etapas"] = etapas.value
 }
 if (capitulos.value != null) {
  obj["capitulos"] = capitulos.value
 }
 console.log("OBJ", obj);

 if(props.obj_to_edit && props.editing === true){
  console.log(props.obj_to_edit?.id)
  let response = await historiaStore.editHistoria(obj, props.obj_to_edit.id);
  console.log("response:",response);
  if(!response.data) {
   errors.value = response;
  }
  if(response===true){
   emit("edit", obj);
  }
 }else{
  let response = await historiaStore.createHistoria(obj);
  console.log("response:",response);
  if(!response.data) {
   errors.value = response;
  }
  if(response===true){
   emit("create", obj);
  }
 }
}

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

onMounted(()=>{
 if(photo_url.value){
  previewPhoto(`${serverBaseUrl}/storage/fotos/${photo_url.value}`);
 }
})


</script>
<template>
  <hr class="my-6">
  <form class="m-2">
  <div class="flex flex-row">
   <div class="w-full">
    <div class="lg:flex flex-row">
     <div class="flex flex-col justify-center w-5/6 mx-auto">
      <div class="flex flex-row w-11/12 my-4 justify-between">
       <div class="w-8/12 mr-4">
        <div class="w-full mb-4">
         <label class="block mb-2 text-base font-medium">Título<label class="text-red-600 ml-1">*</label></label>
         <input type="text" required v-model="titulo"
             class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
             placeholder="Título da História">
         <h1 v-if="errors.titulo" class="text-red-600 text-base font-medium">{{errors.titulo[0]}}</h1>
        </div>
        <div class="w-full my-4">
         <label class="block mb-2 text-base font-medium">Subtítulo<label class="text-red-600 ml-1">*</label></label>
         <input type="text" required v-model="subtitulo"
             class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
             placeholder="Subtítulo da História">
         <h1 v-if="errors.subtitulo" class="text-red-600 text-base font-medium">{{errors.subtitulo[0]}}</h1>
        </div>
        <div class="w-full my-4">
         <label class="block mb-2 text-base font-medium">Imagem</label>
         <input type="file" accept="image/png, image/gif, image/jpeg"
             class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 file:hidden"
             @change="$event.target.files[0].size < 1048576 ? (()=>{photo_url = $event.target.files[0] ; previewPhoto()})() : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
         <h1 v-if="errors.photo_url" class="text-red-600 text-base font-medium">{{errors.photo_url[0]}}</h1>
        </div>
       </div>
       <div class="w-1/3 bg-gray-100 p-4 rounded-xl">
        <div class="flex h-full w-full">
         <Icon v-if="!photo_url" class="flex text-2xl text-gray-500 min-w-20 min-h-20 mx-auto my-auto" icon="f7:photo" />
         <div v-show="photo_url" class="w-full max-h-72 h-full">
          <img src="#" id="file-preview" class="w-full h-full my-auto mx-auto object-contain max-h-72 shadow-soft-2xl">
         </div>
        </div>
       </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4">
       <div class="col-span-full">
        <label for="about" class="block mb-2 text-base font-medium">Conteúdo</label>
        <div class="mt-2">
         <textarea id="about" required rows="3" v-model="conteudo"
              class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"></textarea>
        </div>
        <h1 v-if="errors.conteudo" class="text-red-600 text-base font-medium">{{errors.conteudo[0]}}</h1>
       </div>
      </div>
       <div class="w-full mx-auto my-4">
         <label class="block mb-2 text-base font-medium text-red-600">*<label class="text-red-600 ml-1">Campos Obrigatórios</label></label>
       </div>
      <button :disabled="validated_capitulo()" @click.prevent="()=>{numero_capitulos++; adicionar_capitulo(numero_capitulos); console.log(capitulos)}" class="flex flex-row justify-center w-9/12 mx-auto m-5 disabled:opacity-50 hover:opacity-50">
       <div class="flex border-dashed border-2 border-gray-800 w-full rounded-2xl">
        <div class="flex flex-row justify-center items-center w-full p-14">
         <Icon class="text-2xl text-gray-800 mx-2" icon="zondicons:add-outline" />
         <text class="text-gray-800 text-xl font-bold">Criar capítulo na história</text>
        </div>
       </div>
      </button>
      <hr v-if="capitulos.length" class="my-6">
      <div v-for="(capitulo, index) in capitulos">
       <div class="flex flex-row w-7/12">
        <div class="flex flex-row w-full">
         <div class="w-full">
          <label class="block mb-2 text-base font-medium">Título do Capítulo<label class="text-red-600 ml-1">*</label></label>
          <input type="text" required v-model="capitulo.titulo"
              class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
              placeholder="Título do Capítulo da História">
          <h1 v-if="errors[`capitulos.${index}.titulo`]" class="text-red-600 text-base font-medium">{{ errors[`capitulos.${index}.titulo`]?.[0] }}</h1>
         </div>
         <Icon @click="()=>{remover_capitulo(capitulo.id)}" class="text-2xl text-gray-800 mx-2 mt-10 w-9 h-9" icon="ph:trash" />
        </div>
       </div>
       <div class="w-11/12 mx-auto">
        <div v-for="(etapa, index2) in etapas">
         <div v-if="etapas && capitulos && etapa.capitulo_id==capitulo.id" class="flex flex-row w-11/12 mb-4 justify-between">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full my-4">
           <div>
            <label class="block mb-2 text-base font-medium">Nome<label class="text-red-600 ml-1">*</label></label>
            <input type="text" required v-model="etapa.nome"
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
                placeholder="Nome da Etapa">
            <h1 v-if="errors[`etapas.${index2}.nome`]" class="text-red-600 text-base font-medium">{{ errors[`etapas.${index2}.nome`]?.[0] }}</h1>
           </div>
           <div>
            <label class="block mb-2 text-base font-medium">Ano do Início<label class="text-red-600 ml-1">*</label></label>
            <input type="number" required min="1960" size="4" v-model="etapa.ano_inicio"
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Ano de Início - YYYY">
            <h1 v-if="errors[`etapas.${index2}.ano_inicio`]" class="text-red-600 text-base font-medium">{{ errors[`etapas.${index2}.ano_inicio`]?.[0] }}</h1>
           </div>
           <div>
            <label class="block mb-2 text-base font-medium">Ano do Fim</label>
            <input type="number" min="1960" size="4" v-model="etapa.ano_fim"
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Ano de Fim - YYYY">
            <h1 v-if="errors[`etapas.${index2}.ano_fim`]" class="text-red-600 text-base font-medium">{{ errors[`etapas.${index2}.ano_fim`]?.[0] }}</h1>
           </div>
          </div>
          <Icon @click="()=>{remover_etapa(etapa.id)}" class="text-2xl text-gray-800 mx-2 mt-14 w-9 h-9" icon="ph:trash" />
         </div>
        </div>
        <div class="flex flex-row">
         <div v-if="capitulos" class="flex flex-row justify-center w-9/12 mx-auto m-5 px-3">
          <button :disabled="validated_etapa(capitulo.id)" class="flex py-4 px-5 bg-gray-100 rounded-2xl disabled:opacity-50 hover:opacity-50" @click.prevent="()=>{numero_etapas++; adicionar_etapa(numero_etapas, capitulo.id); }">
           <div class="flex flex-row justify-center items-center">
            <Icon class="text-2xl text-gray-800 mx-2 w-8 h-8" icon="ri:menu-add-line" />
            <text class="text-gray-800 text-xl font-bold">Adicionar etapa no capítulo</text>
           </div>
          </button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
    <br>
    <div class="flex justify-center w-full">
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