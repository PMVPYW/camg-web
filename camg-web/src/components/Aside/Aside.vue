<script setup>
import {useRouter} from "vue-router";

const route= useRouter();
</script>
<template>
  <aside class="h-full mr-6 ease-nav-brand z-990 inset-y-0 my-4 ml-4 block min-w-72 -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent text-slate-500" id="sidenav-main">
    <div class="items-center block w-auto max-h-full overflow-auto h-sidenav grow basis-full">
      <ul class="flex flex-col pl-0 mb-0 h-full">
        <li class="w-full mt-4">
          <h6 class="pl-6 ml-2 my-4 font-bold leading-tight uppercase text-xs opacity-60">Acerca do Clube</h6>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'home'}">
          <router-link :to="{ name: 'home' }" :class="{active: $route.name === 'home', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'home'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'home', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'home', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'home'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Dashboard</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'noticias'}">
          <router-link :to="{ name: 'noticias' }" :class="{active: $route.name === 'noticias', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'noticias'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'noticias', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'noticias', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'noticias'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Noticias</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Noticias</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === ''}">
          <router-link :to="{ name: '' }" :class="{active: $route.name === '', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === ''}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === '', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === '', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== ''}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Rallies</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Rallies</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'albuns'}">
          <router-link :to="{ name: 'albuns' }" :class="{active: $route.name === 'albuns', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'albuns'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'albuns', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'albuns', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'albuns'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Albuns</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Albuns</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'historias'}">
          <router-link :to="{ name: 'historias' }" :class="{active: $route.name === 'historias', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'historias'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'historias', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'historias', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'historias'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>História</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">História</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'contactos'}">
          <router-link :to="{ name: 'contactos' }" :class="{active: $route.name === 'contactos', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'contactos'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'contactos', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'contactos', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'contactos'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Contactos</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Contactos</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'orgaos_sociais'}">
          <router-link :to="{ name: 'orgaos_sociais' }" :class="{active: $route.name === 'orgaos_sociais', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'orgaos_sociais'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'orgaos_sociais', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'orgaos_sociais', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'orgaos_sociais'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Orgãos Socias</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Orgãos Socias</span>
          </router-link>
        </li>
        <hr class="h-px my-4 bg-transparent bg-gradient-horizontal-dark">

        <li class="w-full">
          <h6 class="pl-6 ml-2 my-4 font-bold leading-tight uppercase text-xs opacity-60">Acerca dos Rallys</h6>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'patrocinios'}">
          <router-link :to="{ name: 'patrocinios' }" :class="{active: $route.name === 'patrocinios', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'patrocinios'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'patrocinios', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'patrocinios', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'patrocinios'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Patrocinios</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Patrocinios</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'horarios'}">
          <router-link :to="{ name: 'horarios' }" :class="{active: $route.name === 'horarios', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'horarios'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'horarios', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'horarios', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'horarios'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Horários</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Horários</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'conselhos_seguranca'}">
          <router-link :to="{ name: 'conselhos_seguranca' }" :class="{active: $route.name === 'conselhos_seguranca', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'conselhos_seguranca'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'conselhos_seguranca', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'conselhos_seguranca', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'conselhos_seguranca'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Conselhos de Segurança</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Conselhos de Segurança</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'declaracoes'}">
          <router-link :to="{ name: 'declaracoes' }" :class="{active: $route.name === 'declaracoes', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'declaracoes'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'declaracoes', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'declaracoes', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'declaracoes'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Declarações</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Declarações</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full" :class="{'drop-shadow-md': $route.name === 'zonas_espetaculo'}">
          <router-link :to="{ name: 'zonas_espetaculo' }" :class="{active: $route.name === 'zonas_espetaculo', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'zonas_espetaculo'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'zonas_espetaculo', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'zonas_espetaculo', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'zonas_espetaculo'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Zonas de Espetáculo</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Zonas de Espetáculo</span>
          </router-link>
        </li>
        <li class="mt-0.5 w-full mb-4" :class="{'drop-shadow-md': $route.name === 'provas'}">
          <router-link :to="{ name: 'provas' }" :class="{active: $route.name === 'provas', 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors': $route.name === 'provas'}"  class="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="javascript:;">
            <div :class="{active: $route.name === 'provas', 'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name === 'provas', 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1': $route.name !== 'provas'}">
              <svg width="12px" height="12px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Provas</title>
              </svg>
            </div>
            <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Provas</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="m-4">
      <p class="invisible hidden text-gray-800 text-red-500 text-red-600 after:bg-gradient-dark-gray after:bg-gradient-cyan after:bg-gradient-orange after:bg-gradient-lime after:bg-gradient-red after:bg-gradient-slate text-lime-500 text-cyan-500 text-slate-400 text-fuchsia-500"></p>
      <div class="after:opacity-65 after:bg-gradient-to-tl after:from-slate-600 after:to-slate-300 relative flex min-w-0 flex-col items-center break-words rounded-2xl border-0 border-solid border-blue-900 bg-white bg-clip-border shadow-none after:absolute after:top-0 after:bottom-0 after:left-0 after:z-10 after:block after:h-full after:w-full after:rounded-2xl after:content-['']" sidenav-card="">
        <div class="mb-7.5 absolute h-full w-full rounded-2xl bg-cover bg-center"></div>
        <div class="relative z-20 flex-auto w-full p-4 text-left text-white">
          <div class="flex items-center justify-center w-8 h-8 mb-4 text-center bg-white bg-center rounded-lg icon shadow-soft-2xl">
            <i class="top-0 z-10 text-lg leading-none text-transparent ni ni-diamond bg-gradient-to-tl from-slate-600 to-slate-300 bg-clip-text opacity-80" aria-hidden="true" sidenav-card-icon=""></i>
          </div>
          <div class="transition-all duration-200 ease-nav-brand">
            <h6 class="mb-0 text-white">Want to find more?</h6>
            <p class="mt-0 mb-4 font-semibold leading-tight text-xs">Please check our shop</p>
            <a href="javascript:;" class="inline-block w-full px-8 py-2 mb-0 font-bold text-center text-black uppercase transition-all ease-in bg-white border-0 border-white rounded-lg shadow-soft-md bg-150 leading-pro text-xs hover:shadow-soft-2xl hover:scale-102">NFT Shop</a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>