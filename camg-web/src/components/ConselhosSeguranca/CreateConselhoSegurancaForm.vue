<script setup>
import {ref, watch, inject} from "vue";
import {Icon} from "@iconify/vue";
const props = defineProps(["obj_to_edit", "errors", "editing"])
const emit = defineEmits(["create", "edit"])

const serverBaseUrl = inject("serverBaseUrl");

const descricao = ref(props.obj_to_edit?.descricao);
const erro = ref(props.obj_to_edit?.erro);
const viewing_foto = ref(props.obj_to_edit?.img_conselho ? serverBaseUrl + "/storage/fotos/" + props.obj_to_edit?.img_conselho : null);
const foto = ref(null);
const viewing_foto_erro = ref(props.obj_to_edit?.img_erro ? serverBaseUrl + "/storage/fotos/" + props.obj_to_edit?.img_erro : null);
const foto_erro = ref(null)

const errors = ref({});

watch(()=>props.errors, (n_errors)=>{
 errors.value = n_errors ?? {};
 console.log(errors.value, "err")
})

function handleFileChange(event) {
 const file = event.target.files[0];
 const reader = new FileReader();
 foto.value = file;
 reader.onload = () => {
  viewing_foto.value = reader.result;
 };

 if (file) {
  reader.readAsDataURL(file);
 }
}

function handleFileChangeErro(event) {
 const file = event.target.files[0];
 const reader = new FileReader();
 foto_erro.value = file;
 reader.onload = () => {
  viewing_foto_erro.value = reader.result;
 };

 if (file) {
  reader.readAsDataURL(file);
 }
}

const emitConselhoSeguranca = () => {
const form = document.getElementById("form")
 if (!form.checkValidity()) {
  form.reportValidity();
  return;
 }
 const obj = {
  "descricao": descricao.value,
  "img_conselho": foto.value,
  "erro": erro.value,
  "img_erro": foto_erro.value,
 };
 emit(props.obj_to_edit && props.editing ? 'edit' : "create", obj);
}
</script>
<template>
  <hr class="my-6">
  <form class="m-2 w-full h-1/2" id="form">
    <div class="flex flex-row w-full h-full justify-center items-start">
      <div class="flex flex-col w-9/12 h-1/2 justify-center items-start">
        <label class="h-10 my-1 ml-2 p-2 font-bold text-center rounded-lg w-auto">Correto:</label>
        <textarea type="text" name="descricao" placeholder="Descrição do conselho" required v-model="descricao"
           class="text-sm h-full mb-2 ml-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"></textarea>
        <h1 v-if="errors.descricao" class="ml-2 text-red-600 text-base font-medium">{{errors.descricao[0]}}</h1>
      </div>
      <div class="flex mx-auto flex-col items-start justify-end w-2/12 h-1/2">
       <label class="h-10 my-1 p-2 font-bold text-center rounded-lg w-auto">Imagem do conselho:</label>

       <div class="w-full max-h-full flex items-center justify-center rounded-xl border-4 border-green-500 h-full">
            <input name="foto" id="foto" accept="image/png, image/gif, image/jpeg" @change="handleFileChange" type="file" class="hidden">
            <label for="foto" class="hover:blur-sm w-full h-full rounded-xl">
              <img v-if="viewing_foto" class="mx-auto rounded-xl h-24 w-full object-contain"
                :src="viewing_foto">
              <Icon v-else icon="lucide:check" class="w-full h-24 text-green-600">
              </Icon>
            </label>
          </div>
          <br v-if="errors.img_conselho"><span class="font-bold text-sm text-red-600" v-if="errors.img_conselho">{{errors?.img_conselho[0]}}</span>
      </div>
    </div>
    <div class="flex flex-row w-full h-full justify-center items-start my-5">
      <div class="flex flex-col w-9/12 h-1/2 justify-center items-start">
        <label class="h-10 my-1 ml-2 p-2 font-bold text-center rounded-lg w-auto">Errado:</label>
        <textarea type="text" name="erro" placeholder="Descrição do erro cometido" required v-model="erro"
           class="text-sm h-full mb-2 ml-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"></textarea>
        <h1 v-if="errors.erro" class="ml-2 text-red-600 text-base font-medium">{{errors.erro[0]}}</h1>
      </div>
      <div class="flex mx-auto flex-col items-start justify-end w-2/12 h-1/2">
       <label class="h-10 my-1 p-2 font-bold text-center rounded-lg w-auto">Imagem do erro:</label>
       <div class="w-full max-h-full flex items-center justify-center rounded-xl border-4 border-red-500 h-full">
            <input name="foto_erro" id="foto_erro" accept="image/png, image/gif, image/jpeg" @change="handleFileChangeErro" type="file" class="hidden">
            <label for="foto_erro" class="hover:blur-sm w-full h-full rounded-xl">
              <img v-if="viewing_foto_erro" class="mx-auto rounded-xl h-24 w-full object-contain"
                :src="viewing_foto_erro">
              <Icon v-else icon="iconamoon:close" class="w-full h-24 text-red-600">
              </Icon>
            </label>
          </div>
          <br v-if="errors.img_erro"><span class="font-bold text-sm text-red-600" v-if="errors.img_erro">{{errors?.img_erro[0]}}</span>

      </div>
    </div>
    <div class="w-1/6 mx-auto">
     <input type="submit"
        @click.prevent="emitConselhoSeguranca"
        class="opacity-85 text-center w-full m-2 mt-8 py-2 px-4 gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
        :value="props.obj_to_edit && props.editing ? 'Editar' : 'Criar'"/>
    </div>
  </form>
  <hr class="my-6">
</template>