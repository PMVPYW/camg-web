<script setup>

import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useUserStore} from "@/stores/user.js";
import router from "@/router/index.js";
import {ref} from "vue";

const rallyStore = useRallyStore();
const patrocinioStore = usePatrocinioStore();
const userStore = useUserStore();

const show_dropdown = ref(false)

</script>
<template>
  <div class="flex flex-row items-center bg-white drop-shadow-lg w-full h-20 border-b-2 border-yellow-400">
    <div class="flex flex-grow flex-row justify-between">
      <div>
        <i class="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-imes text-slate-400 xl:hidden"
           sidenav-close="" aria-hidden="true"></i>
        <a class="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="javascript:;">
          <span class="ml-1 text-xl font-semibold transition-all duration-200 ease-nav-brand">CAMG-WEB</span>
        </a>
      </div>
      <div class="flex flex-row items-center justify-end">
        <div v-if="rallyStore.rally_selected">
          <div v-if="$route.name === 'patrocinios' || $route.name === 'conselhos_seguranca' || $route.name === 'horarios' || $route.name === 'provas' || $route.name === 'zonas_espetaculo' || $route.name === 'declaracoes' || $route.name ==='patrociniosOficiais'"
              class="flex justify-end items-center flex-grow m-3 mx-8">
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
        <span class="w-full flex items-center justify-end">
          <div>
            <img @click="show_dropdown = !show_dropdown" v-if="userStore.user?.photo_url" class="h-12 w-12 mr-12 rounded-full" :src="userStore.profile_photo">
            <svg  @click="show_dropdown = !show_dropdown" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 class="inline-block mr-12 rounded-full ring-2 bg-white/10 ring-indigo-700/30 text-indigo-700/70 w-12 h-12">
              <path fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"/>
            </svg>
            <div
              class="absolute right-0 z-100 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div v-if="show_dropdown" class="py-1" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <router-link :to="{name: 'settings'}">
                  <button @click="()=>{show_dropdown = false}" class="hover:bg-slate-200 text-gray-700 block px-4 py-2 text-sm w-full" role="menuitem" tabindex="-1"
                          id="menu-item-0">Perfil</button>
                </router-link>
                <button @click="async ()=>{await userStore.logout(); router.push({name: 'login'})}"
                        class="hover:bg-red-200 text-gray-700 block px-4 py-2 text-sm w-full" role="menuitem" tabindex="-1"
                        id="menu-item-1">Logout</button>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>