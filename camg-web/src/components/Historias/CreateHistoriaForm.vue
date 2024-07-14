<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";

const criar_capitulo = ref(false);
const criar_etapa = ref(false);
const numero_etapas = ref(0);
const associar_capitulo = ref(false);


</script>
<template>
  <form class="m-2">
    <div class="flex flex-row">
      <div class="w-full">
        <div class="lg:flex flex-row">
          <div class="flex flex-col justify-center w-5/6 mx-auto">
            <div class="flex flex-row w-11/12 my-4 justify-between">
              <div class="w-2/5">
                <div class="w-full">
                  <label class="block mb-2 text-base font-medium">Titulo</label>
                  <input type="text" required
                         class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                         placeholder="Titulo">
                  <h1 class="text-red-600 text-base font-medium">error</h1>
                </div>
                <div class="w-full my-2">
                  <label class="block mb-2 text-base font-medium">Subtitulo</label>
                  <input type="text" required
                         class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         placeholder="Subtitulo">
                  <h1 class="text-red-600 text-base font-medium">error</h1>
                </div>
                <div class="w-full mt-2">
                  <label class="block mb-2 text-base font-medium">Imagem</label>
                  <input type="file" accept="image/png, image/gif, image/jpeg"
                         class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm file:hidden">
                  <h1 class="text-red-600 text-base font-medium">errors</h1>
                </div>
              </div>
              <div class="w-1/2 bg-gray-200 p-4 rounded-xl">
                <div class="flex h-full w-full">
                  <Icon class="flex text-2xl text-gray-500 min-w-20 min-h-20 mx-auto my-auto" icon="f7:photo" />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4">
              <div class="col-span-full">
                <label for="about" class="block mb-2 text-base font-medium">Conteúdo</label>
                <div class="mt-2">
                  <textarea id="about" required rows="3"
                            class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"></textarea>
                </div>
                <h1 class="text-red-600 text-base font-medium">errors</h1>
              </div>
            </div>
            <div v-if="!criar_capitulo" @click="criar_capitulo=!criar_capitulo" class="flex flex-row justify-center w-9/12 mx-auto m-5">
              <div class="flex border-dashed border-2 border-gray-800 w-full rounded-2xl hover:opacity-50">
                <div class="flex flex-row justify-center items-center w-full p-14">
                  <Icon class="text-2xl text-gray-800 mx-2" icon="zondicons:add-outline" />
                  <a type="button" class="text-gray-800 text-xl font-bold">Criar capítulo na história</a>
                </div>
              </div>
            </div>
            <hr v-if="criar_capitulo" class="my-6">
            <div v-if="criar_capitulo" class="flex flex-row w-7/12">
              <div class="flex flex-row w-full">
                <div class="w-full">
                  <label class="block mb-2 text-base font-medium">Titulo do capítulo</label>
                  <input type="text" required
                         class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                         placeholder="Titulo">
                  <h1 class="text-red-600 text-base font-medium">error</h1>
                </div>
              </div>
            </div>
            <div class="w-11/12 mx-auto">
              <div v-for="numero_etapa in numero_etapas">
                <div v-if="criar_etapa && criar_capitulo" class="flex flex-row w-11/12 mb-4 justify-between">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full my-4">
                    <div>
                      <label class="block mb-2 text-base font-medium">Nome</label>
                      <input type="text" required
                             class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                             placeholder="Nome">
                      <h1 class="text-red-600 text-base font-medium">error</h1>
                    </div>
                    <div>
                      <label class="block mb-2 text-base font-medium">Ano do Inicio</label>
                      <input type="number" required min="1960"
                             class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                             placeholder="Ano - YYYY">
                      <h1 class="text-red-600 text-base font-medium">errors</h1>
                    </div>
                    <div>
                      <label class="block mb-2 text-base font-medium">Ano do Fim</label>
                      <input type="number" required min="1960"
                             class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                             placeholder="Ano - YYYY">
                      <h1 class="text-red-600 text-base font-medium">errors</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row w-11/12">
                <div v-if="criar_capitulo" @click="()=>{numero_etapas==0 ? criar_etapa=!criar_etapa : '' ; numero_etapas++}" class="flex flex-row justify-center w-9/12 mx-auto m-5 px-3">
                  <div class="flex border-dashed border-2 border-gray-800 w-full rounded-2xl hover:opacity-50">
                    <div class="flex flex-row justify-center items-center w-full p-14">
                      <Icon class="text-2xl text-gray-800 mx-2" icon="zondicons:add-outline" />
                      <a type="button" class="text-gray-800 text-xl font-bold">Criar etapa no capítulo</a>
                    </div>
                  </div>
                </div>
                <div v-if="criar_capitulo" @click="()=>{numero_etapas==1 ? criar_etapa=!criar_etapa : '' ; numero_etapas!==0 ? numero_etapas-- : numero_etapas }" class="flex flex-row justify-center w-9/12 mx-auto m-5 px-3">
                  <div class="flex border-dashed border-2 border-gray-800 w-full rounded-2xl hover:opacity-50">
                    <div class="flex flex-row justify-center items-center w-full p-14">
                      <Icon class="text-2xl text-gray-800 mx-2" icon="zondicons:minus-outline" />
                      <a type="button" class="text-gray-800 text-xl font-bold">Remover etapa no capítulo</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-center w-full">
          <button type="button"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Criar
          </button>
        </div>
      </div>
    </div>
  </form>
  <hr class="my-6">
</template>