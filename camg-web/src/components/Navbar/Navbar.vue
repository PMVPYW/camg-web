<script setup>

import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useUserStore} from "@/stores/user.js";

const rallyStore = useRallyStore();
const patrocinioStore = usePatrocinioStore();
const userStore = useUserStore();

</script>
<template>
  <div class="flex flex-row items-center bg-white drop-shadow-lg w-full h-20 border-b-2 border-yellow-400">
    <div class="flex flex-grow flex-row">
      <i class="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-imes text-slate-400 xl:hidden"
         sidenav-close="" aria-hidden="true"></i>
      <a class="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="javascript:;">
        <span class="ml-1 text-xl font-semibold transition-all duration-200 ease-nav-brand">CAMG-WEB</span>
      </a>
      <span class="w-full flex items-center justify-end">
        <router-link :to="{name: 'settings'}">
          <img class="h-12 w-12 mr-12 rounded-full" :src="userStore.profile_photo">
        </router-link>
</span>

    </div>
    <diV v-if="rallyStore.rally_selected">
      <div
          v-if="$route.name === 'patrocinios' || $route.name === 'conselhos_seguranca' || $route.name === 'horarios' || $route.name === 'provas' || $route.name === 'zonas_espetaculo' || $route.name === 'declaracoes'"
          class="flex justify-end items-center flex-grow m-3">
        <h1 class="block text-slate-700 text-base font-medium mr-2">Rally:</h1>
        <select v-model="rallyStore.rally_selected"
                @change="()=>{patrocinioStore.loadPatrocinios({}); patrocinioStore.loadpatrocinosSemAssociacao()}"
                class="uppercase font-bold py-3 px-4 block text-slate-700 bg-gray-100 rounded-lg text-xs border-b-2 h-10 border-amber-400">
          <option class="uppercase" v-for="rally in rallyStore.rallies" :value="rally.id"
                  :selected="rally.id===rallyStore.rally_selected">{{ rally.nome }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>