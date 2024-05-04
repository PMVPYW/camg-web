<script setup>
import { Icon } from '@iconify/vue';
import {ref} from "vue";
let button = ref(false);
</script>
<template>
  <div class="flex flex-col">
    <aside class="sm:flex hidden w-72 h-screen mr-6 ease-nav-brand z-990 inset-y-0 my-4 ml-4 flex-wrap overflow-hidden justify-between rounded-2xl border-0 bg-white p-0 shadow-none transition-transform duration-200 sm:left-1 sm:translate-x-0 sm:bg-transparent text-slate-500">
      <div class="items-center block w-auto max-h-full overflow-auto h-sidenav grow basis-full">
        <ul class="flex flex-col pl-0 mb-0 h-full">
          <li class="w-full mt-4">
            <h6 class="pl-6 ml-2 my-4 font-bold leading-tight uppercase text-xs opacity-60">Acerca do Clube</h6>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'home'}">
            <router-link :to="{ name: 'home' }" :class="{active: $route.name === 'home', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'home'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'home', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'home'}">
                  <Icon icon="mdi-light:home" class="min-w-5 min-h-5 font-bold" :class="{'text-white': $route.name === 'home'}">
                    <title>Dashboard</title>
                  </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'noticias'}">
            <router-link :to="{ name: 'noticias' }" :class="{active: $route.name === 'noticias', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'noticias'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'noticias', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'noticias'}">
                <Icon icon="fluent:news-20-regular" class="min-w-5 min-h-5 font-bold" :class="{'text-white': $route.name === 'noticias'}">
                  <title>Noticias</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Noticias</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'rallies'}">
            <router-link :to="{ name: 'rallies' }" :class="{active: $route.name === 'rallies', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'rallies'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'rallies', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'rallies'}">
                <Icon icon="mdi:car-traction-control" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'rallies'}">
                  <title>Rallies</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Rallies</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'albuns'}">
            <router-link :to="{ name: 'albuns' }" :class="{active: $route.name === 'albuns', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'albuns'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'albuns', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'albuns'}">
                <Icon icon="material-symbols:imagesmode-outline-rounded" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'albuns'}">
                  <title>Albuns</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Albuns</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'historias'}">
            <router-link :to="{ name: 'historias' }" :class="{active: $route.name === 'historias', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'historias'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'historias', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'historias'}">
                <Icon icon="ic:sharp-history-edu" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'historias'}">
                  <title>História</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">História</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'contactos'}">
            <router-link :to="{ name: 'contactos' }" :class="{active: $route.name === 'contactos', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'contactos'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'contactos', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'contactos'}">
                <Icon icon="ic:baseline-phone" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'contactos'}">
                  <title>Contactos</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Contactos</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'orgaos_sociais'}">
            <router-link :to="{ name: 'orgaos_sociais' }" :class="{active: $route.name === 'orgaos_sociais', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'orgaos_sociais'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'orgaos_sociais', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'orgaos_sociais'}">
                <Icon icon="grommet-icons:group" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'orgaos_sociais'}">
                  <title>Orgãos Socias</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Orgãos Socias</span>
            </router-link>
          </li>
          <hr class="h-px my-4 bg-transparent bg-gradient-horizontal-dark">

          <li class="w-full">
            <h6 class="pl-6 ml-2 my-4 font-bold leading-tight uppercase text-xs opacity-60">Acerca dos Rallys</h6>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'patrocinios'}">
            <router-link :to="{ name: 'patrocinios' }" :class="{active: $route.name === 'patrocinios', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'patrocinios'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'patrocinios', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'patrocinios'}">
                <Icon icon="mdi:account-star-outline" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'patrocinios'}">
                  <title>Patrocinios</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Patrocinios</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'provas'}">
            <router-link :to="{ name: 'provas' }" :class="{active: $route.name === 'provas', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'provas'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'provas', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'provas'}">
                <Icon icon="maki:racetrack" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'provas'}">
                  <title>Entidades Especiais</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Entidades Especiais</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'horarios'}">
            <router-link :to="{ name: 'horarios' }" :class="{active: $route.name === 'horarios', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'horarios'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'horarios', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'horarios'}">
                <Icon icon="ic:round-access-time" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'horarios'}">
                  <title>Horários</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Horários</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'conselhos_seguranca'}">
            <router-link :to="{ name: 'conselhos_seguranca' }" :class="{active: $route.name === 'conselhos_seguranca', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'conselhos_seguranca'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'conselhos_seguranca', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'conselhos_seguranca'}">
                <Icon icon="mdi:security-account" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'conselhos_seguranca'}">
                  <title>Conselhos de Segurança</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Conselhos de Segurança</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'declaracoes'}">
            <router-link :to="{ name: 'declaracoes' }" :class="{active: $route.name === 'declaracoes', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'declaracoes'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'declaracoes', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'declaracoes'}">
                <Icon icon="mdi:comments-outline" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'declaracoes'}">
                  <title>Declarações</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Declarações</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'zonas_espetaculo'}">
            <router-link :to="{ name: 'zonas_espetaculo' }" :class="{active: $route.name === 'zonas_espetaculo', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'zonas_espetaculo'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'zonas_espetaculo', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'zonas_espetaculo'}">
                <Icon icon="bxs:binoculars" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'zonas_espetaculo'}">
                  <title>Zonas de Espetáculo</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Zonas de Espetáculo</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full mb-4" :class="{'drop-shadow-md': $route.name === 'provas'}">
            <router-link :to="{ name: 'provas' }" :class="{active: $route.name === 'provas', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'provas'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'provas', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'provas'}">
                <Icon icon="maki:racetrack" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'provas'}">
                  <title>Provas</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Provas</span>
            </router-link>
          </li>
          <li class="w-full">
            <h6 class="pl-6 ml-2 my-4 font-bold leading-tight uppercase text-xs opacity-60">Gestão Back Office</h6>
          </li>
          <li class="mt-0.5 w-full mb-4" :class="{'drop-shadow-md': $route.name === 'admins'}">
            <router-link :to="{ name: 'admins' }" :class="{active: $route.name === 'admins', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'admins'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
              <div :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'admins', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'admins'}">
                <Icon icon="clarity:administrator-line" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'admins'}">
                  <title>Conselhos de Segurança</title>
                </Icon>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Gerir Administradores</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
    <button @click="button=!button" type="button" class="p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
    </button>
    <aside v-if="button==true" class="sm:hidden min-w-14 max-w-14 bg-white h-full mr-6 ease-nav-brand z-990 inset-y-0 my-4 ml-4 block flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0  p-0 shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent text-slate-500">
      <div class="items-center block w-auto max-h-full overflow-auto h-sidenav grow basis-full">
        <ul class="flex flex-col pl-0 mb-0 h-full">
          <li class="mx-auto mt-4">
            <h6 class="my-4 font-bold leading-tight uppercase text-xs opacity-60">Clube</h6>
          </li>
          <li class="mt-0.5 mx-auto" :class="{'drop-shadow-md': $route.name === 'home'}">
            <router-link :to="{ name: 'home' }" :class="{active: $route.name === 'home','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'home', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'home'}">
              <Icon icon="mdi-light:home" class="min-w-5 min-h-5 font-bold" :class="{'text-white': $route.name === 'home'}">
                <title>Dashboard</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'noticias'}">
            <router-link :to="{ name: 'noticias' }" :class="{active: $route.name === 'noticias','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'noticias', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'noticias'}">
              <Icon icon="fluent:news-20-regular" class="min-w-5 min-h-5 font-bold" :class="{'text-white': $route.name === 'noticias'}">
                <title>Noticias</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'rallies'}">
            <router-link :to="{ name: 'rallies' }" :class="{active: $route.name === 'rallies','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'rallies', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'rallies'}">
              <Icon icon="mdi:car-traction-control" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'rallies'}">
                <title>Rallies</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'albuns'}">
            <router-link :to="{ name: 'albuns' }" :class="{active: $route.name === 'albuns','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'albuns', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'albuns'}">
              <Icon icon="material-symbols:imagesmode-outline-rounded" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'albuns'}">
                <title>Albuns</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'historias'}">
            <router-link :to="{ name: 'historias' }" :class="{active: $route.name === 'historias','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'historias', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'historias'}">
              <Icon icon="ic:sharp-history-edu" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'historias'}">
                <title>História</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'contactos'}">
            <router-link :to="{ name: 'contactos' }" :class="{active: $route.name === 'contactos','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'contactos', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'contactos'}">
              <Icon icon="ic:baseline-phone" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'contactos'}">
                <title>Contactos</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'orgaos_sociais'}">
            <router-link :to="{ name: 'orgaos_sociais' }" :class="{active: $route.name === 'orgaos_sociais','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'orgaos_sociais', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'orgaos_sociais'}">
              <Icon icon="grommet-icons:group" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'orgaos_sociais'}">
                <title>Orgãos Socias</title>
              </Icon>
            </router-link>
          </li>
          <hr class="h-px my-4 bg-transparent bg-gradient-horizontal-dark">

          <li class="mx-auto">
            <h6 class="my-4 font-bold leading-tight uppercase text-xs opacity-60">Rallys</h6>
          </li>
          <li class="mt-0.5 mx-auto" :class="{'drop-shadow-md': $route.name === 'patrocinios'}">
            <router-link :to="{ name: 'patrocinios' }" :class="{active: $route.name === 'patrocinios','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'patrocinios', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'patrocinios'}">
              <Icon icon="mdi:account-star-outline" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'patrocinios'}">
                <title>Patrocinios</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'horarios'}">
            <router-link :to="{ name: 'horarios' }" :class="{active: $route.name === 'horarios','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'horarios', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'horarios'}">
              <Icon icon="ic:round-access-time" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'horarios'}">
                <title>Horários</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'conselhos_seguranca'}">
            <router-link :to="{ name: 'conselhos_seguranca' }" :class="{active: $route.name === 'conselhos_seguranca','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'conselhos_seguranca', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'conselhos_seguranca'}">
              <Icon icon="mdi:security-account" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'conselhos_seguranca'}">
                <title>Conselhos de Segurança</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'declaracoes'}">
            <router-link :to="{ name: 'declaracoes' }" :class="{active: $route.name === 'declaracoes','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'declaracoes', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'declaracoes'}">
              <Icon icon="mdi:comments-outline" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'declaracoes'}">
                <title>Declarações</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2" :class="{'drop-shadow-md': $route.name === 'zonas_espetaculo'}">
            <router-link :to="{ name: 'zonas_espetaculo' }" :class="{active: $route.name === 'zonas_espetaculo','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'zonas_espetaculo', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'zonas_espetaculo'}">
              <Icon icon="bxs:binoculars" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'zonas_espetaculo'}">
                <title>Zonas de Espetáculo</title>
              </Icon>
            </router-link>
          </li>
          <li class="mt-0.5 mx-auto pt-2 mb-4" :class="{'drop-shadow-md': $route.name === 'provas'}">
            <router-link :to="{ name: 'provas' }" :class="{active: $route.name === 'provas','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'provas', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'provas'}">
              <Icon icon="maki:racetrack" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'provas'}">
                <title>Provas</title>
              </Icon>
            </router-link>
          </li>
          <hr class="h-px my-4 bg-transparent bg-gradient-horizontal-dark">
          <li class="mx-auto">
            <h6 class="text-center my-4 font-bold leading-tight uppercase text-xs opacity-60">Back Office</h6>
          </li>
          <li class="mt-0.5 mx-auto pt-2 mb-4" :class="{'drop-shadow-md': $route.name === 'admins'}">
            <router-link :to="{ name: 'admins' }" :class="{active: $route.name === 'admins','bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center text-center': $route.name === 'admins', 'shadow-soft-2xl flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center p-1': $route.name !== 'admins'}">
              <Icon icon="clarity:administrator-line" class="min-w-5 min-h-5" :class="{'text-white': $route.name === 'admins'}">
                <title>Provas</title>
              </Icon>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>