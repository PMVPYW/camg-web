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
          <img v-if="userStore.user?.photo_url" class="h-12 w-12 mr-12 rounded-full" :src="userStore.profile_photo">
          <svg  v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block mr-12 rounded-full ring-2 bg-white/10 ring-indigo-700/30 text-indigo-700/70 w-12 h-12">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
          </svg>
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