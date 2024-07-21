<script setup>
import {ref} from "vue";
import {Icon} from "@iconify/vue";
const props = defineProps(["obj_to_edit", "errors"])
const emit = defineEmits(["create", "edit"])

const descricao = ref(null);
const img_conselho = ref();
const erro = ref(null);
const viewing_foto  =ref(null);
const viewing_foto_erro  =ref(null);


function handleFileChange(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

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
    console.error("")
  reader.onload = () => {
    viewing_foto_erro.value = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}
</script>
<template>
    <form class="m-2 w-full h-1/2">
        <div class="flex flex-row w-full h-full justify-center">
            <div class="flex flex-col w-9/12 h-1/2 justify-center items-start">
                <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Descrição:</label>
                <textarea type="text" name="descricao" placeholder="Descrição do conselho" required v-model="descricao"
                     class="text-sm h-full my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"></textarea>
                <h1 v-if="errors.nome" class="ml-2 text-red-600 text-base font-medium">{{errors.nome[0]}}</h1>
            </div>
            <div class="flex mx-auto flex-col items-center justify-end w-2/12 h-1/2">
                <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Imagem</label>
                    <div class="mx-8 w-full max-h-full flex items-center justify-center rounded-xl border-2 h-full">
                        <input id="foto" accept="image/png, image/gif, image/jpeg" @change="handleFileChange" type="file" class="hidden">
                        <label for="foto" class="hover:blur-sm w-full h-full rounded-xl">
                            <img v-if="viewing_foto" class="mx-auto rounded-xl h-24 w-full object-contain"
                                :src="viewing_foto"><br v-if="errors.photo_url"><span class="font-bold text-sm text-red-600" v-if="errors.photo_url">{{errors?.photo_url[0]}}</span>
                            <Icon v-if="!viewing_foto" icon="bi:camera" class="w-full h-24 text-dark">
                            </Icon>
                        </label>
                    </div>

            </div>
        </div>
        <div class="flex flex-row w-full h-full justify-center">
            <div class="flex flex-col w-9/12 h-1/2 justify-center items-start">
                <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Erro:</label>
                <textarea type="text" name="erro" placeholder="Descrição do conselho" required v-model="erro"
                     class="text-sm h-full my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"></textarea>
                <h1 v-if="errors.erro" class="ml-2 text-red-600 text-base font-medium">{{errors.erro[0]}}</h1>
            </div>
            <div class="flex mx-auto flex-col items-center justify-end w-2/12 h-1/2">
                <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Imagem</label>
                    <div class="mx-8 w-full max-h-full flex items-center justify-center rounded-xl border-2 h-full">
                        <input id="foto_erro" accept="image/png, image/gif, image/jpeg" @change="handleFileChangeErro" type="file" class="hidden">
                        <label for="foto_erro" class="hover:blur-sm w-full h-full rounded-xl">
                            <img v-if="viewing_foto_erro" class="mx-auto rounded-xl h-24 w-full object-contain"
                                :src="viewing_foto_erro"><br v-if="errors.foto_erro"><span class="font-bold text-sm text-red-600" v-if="errors.foto_erro">{{errors?.foto_erro[0]}}</span>
                            <Icon v-if="!viewing_foto_erro" icon="bi:camera" class="w-full h-24 text-dark">
                            </Icon>
                        </label>
                    </div>

            </div>
        </div>
    </form>
</template>