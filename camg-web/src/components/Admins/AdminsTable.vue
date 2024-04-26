<script setup>
import {useUserStore} from "@/stores/user.js";
import {inject, ref} from "vue";
import CreateAdminForm from "@/components/Admins/CreateAdminForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";

const serverBaseUrl = inject("serverBaseUrl");
const userStore = useUserStore();

const deleting = ref(null);
</script>

<template>
  <!-- Table responsive wrapper -->
  <div class="overflow-x-auto bg-white overflow-y-scroll">

    <!-- Search input -->
    <div class="relative m-[2px] mb-3 mr-5 float-left">
      <label for="inputSearch" class="sr-only">Search </label>
      <input id="inputSearch" type="text" placeholder="Pesquisar..."
             class="block w-64 rounded-lg border py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"/>
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="h-4 w-4 text-neutral-500">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
      </svg>
    </span>
    </div>

    <!-- Filter -->
    <div class="relative m-[2px] mb-3 float-right hidden sm:block">
      <label for="inputFilter" class="sr-only">Filter</label>
      <select id="inputFilter"
              class="block w-40 rounded-lg border p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400">
        <option value="1" selected>Todos</option>
        <option value="2">Desbloqueados</option>
        <option value="3">Bloqueados</option>
        <option value="4">Por Autorizar</option>
      </select>
    </div>

    <!-- Table -->
    <table class="min-w-full text-left  whitespace-nowrap">

      <!-- Table head -->
      <thead class="uppercase tracking-wider sticky top-0 bg-neutral-50">
      <tr>
        <th scope="col" class="px-6 py-4">
          Foto
        </th>
        <th scope="col" class="px-6 py-4">
          Nome
        </th>
        <th scope="col" class="px-6 py-4">
          Email
        </th>
        <th scope="col" class="px-6 py-4 ">
          Ações
        </th>
      </tr>
      </thead>

      <!-- Table body -->
      <tbody>

      <tr v-for="(admin, index) in userStore.admins" class="border-b hover:bg-neutral-100"
          :class="{'bg-neutral-50': index % 2 === 1, 'bg-gradient-to-br from-slate-100 to-slate-300': admin.id == userStore.user.id}">
        <th scope="row" class="px-6 py-4">
          <img class="h-10 w-10 rounded-full my-2"
               :src="admin.photo_url ?  serverBaseUrl + '/storage/fotos/' + admin.photo_url : '../../../src/assets/default_user_foto.jpg'">
        </th>
        <td class="px-6 py-4">{{ admin.nome }}</td>
        <td class="px-6 py-4">{{ admin.email }}</td>
        <td class="px-6 py-4 space-x-1">
          <button :disabled="admin.id == userStore.user.id" @click="()=>userStore.blockAdmin(admin.id)"
                  class="disabled:bg-gray-500 text-white font-bold rounded-lg w-5/12"
                  :class="{'bg-yellow-400 hover:bg-yellow-500': admin.blocked, 'bg-green-600 hover:bg-green-700': !admin.blocked}">
            {{ admin.blocked ? 'Desbloquear' : 'Bloquear' }}
          </button>
          <button v-if="!admin.authorized"
                  class="w-11/12 text-white font-bold rounded-lg bg-orange-600 hover:bg-orange-700">Autorizar
          </button>
          <button class="bg-red-600 text-white font-bold rounded-lg w-5/12" @click="()=>{deleting = admin}">
            Eliminar
          </button>
        </td>
      </tr>
      </tbody>

    </table>

    <nav class="mt-5 flex items-center justify-between text-sm" aria-label="Page navigation example">
      <p>
        A mostrar <strong>1-5</strong> de <strong>10</strong>
      </p>

      <ul class="list-style-none flex">
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100"
              href="#!"
          >
            Anterior
          </a>
        </li>
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100"
              href="#!"
          >
            1
          </a>
        </li>
        <li aria-current="page">
          <a
              class="relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300"
              href="#!"
          >
            2
            <span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
            (current)
          </span>
          </a>
        </li>
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
              href="#!"
          >
            3
          </a>
        </li>
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100"
              href="#!"
          >
            Seguinte
          </a>
        </li>
      </ul>
    </nav>
    <SimpleDeleteForm v-if="deleting" @delete="()=>{userStore.deleteAdmin(deleting.id); deleting=null}" :obj_to_delete="deleting"></SimpleDeleteForm>

  </div>
</template>