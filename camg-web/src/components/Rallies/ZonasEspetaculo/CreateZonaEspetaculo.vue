<script setup>
import {useProvaStore} from "@/stores/prova.js";

const provaStore = useProvaStore()
const props = defineProps(["coordenadas"]);
</script>
<template>
  <form class="m-2">
    <div class="flex flex-row justify-center w-full">
      <div class="w-6/12">
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12">
            <div>
              <label class="block mb-2 text-base font-medium">Nome</label>
              <input type="text" required  class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome Patrocinio">
              <h1 class="text-red-600 text-base font-medium">nome</h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Nivel Afluência</label>
              <select class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option selected value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
              <h1 class="text-red-600 text-base font-medium">nivel_afluencia</h1>
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12">
            <div>
              <label class="block mb-2 text-base font-medium">Facilidade Acesso</label>
              <select class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option selected value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
              <h1 class="text-red-600 text-base font-medium">facilidade_acesso</h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Distância Estacionamento</label>
              <input type="number" required  class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Distância em metros">
              <h1 class="text-red-600 text-base font-medium">distancia_estacionamento</h1>
            </div>
          </div>
        </div>
        <div  class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12">
            <div>
              <label class="block mb-2 text-base font-medium">Coordenadas</label>
              <input type="text" :disabled="props.coordenadas" required  class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" :placeholder="props.coordenadas">
              <h1  class="text-red-600 text-base font-medium">errors.coordenadas</h1>
            </div>
            <div>
              <label class="block mx-4 text-base font-medium">Prova:</label>
              <select  class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option class="uppercase" v-for="prova in provaStore.provas" :value="prova.id">{{ prova.nome }}
                </option>
              </select>
              <h1  class="text-red-600 text-base font-medium">errors.prova</h1>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <button type="button"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Criar
          </button>
        </div>
      </div>

    </div>
  </form>

</template>