<script setup>
import {Icon} from "@iconify/vue";
import {useRallyStore} from "@/stores/rally.js";

const rallyStore = useRallyStore();
</script>

<template>
  <div v-if="rallyStore.rally_selected" class="h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Conselhos de Segurança</h1>
  </div>
  <div v-else class="mx-auto mt-12">
    <div class="flex flex-row items-center bg-gray-100 border border-amber-400 py-2 px-4 rounded-xl">
      <h1 class="text-gray-500 text-base font-medium">
        Não existem rallys, para ver os conselhos de segurança de um rally terá que o criar primeiro!
      </h1>
      <div>
        <router-link :to="{ name: 'rallies' }" class="py-2.7 h-10 text-sm ease-nav-brand my-0 mx-4 flex  items-center whitespace-nowrap rounded-lg  px-4 font-semibold text-slate-700 transition-colors bg-white shadow-xl">
          <div class="bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1">
            <Icon icon="mdi:car-traction-control" class="min-w-5 min-h-5 text-white">
              <title>Criar Rally</title>
            </Icon>
          </div>
          <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Criar Rally</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
