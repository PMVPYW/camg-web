<script setup>
import {useUserStore} from "@/stores/user.js";
import {inject, reactive, ref, watch} from "vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";

const serverBaseUrl = inject("serverBaseUrl");
const userStore = useUserStore();
const deleting = ref(null);

const filters = reactive({
 page: 1,
 search: null,
 order: "most_recent",
 status: "all"
})

watch(filters, ()=>{
 userStore.loadAdmins(filters);
})

function applyFilters(int) {
 filters.page = int;
 userStore.loadAdmins(filters);
}

</script>

<template>
 <!-- Table responsive wrapper -->
 <div class="overflow-x-auto bg-white overflow-y-scroll border-2 border-gray-300 rounded-xl">
  <!-- Search input -->
  <div class="relative m-[2px] mb-3 mr-5 float-left p-2">
   <label for="inputSearch" class="sr-only">Search </label><br>
   <input id="inputSearch" type="text" placeholder="Pesquisar..." v-model="filters.search"
       class="block w-64 rounded-lg border py-2 px-4 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"/>

  </div>

  <!-- Filter -->
  <div class="relative m-[2px] mb-3 float-right hidden sm:block p-2">
   <label for="inputFilter" class="inline">Filtrar</label>
   <select id="inputFilter"
       class="block w-40 rounded-lg border p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
       v-model="filters.status">
    <option value="all" selected>Todos</option>
    <option value="unblocked">Desbloqueados</option>
    <option value="blocked">Bloqueados</option>
    <option value="unauthorized">Por Autorizar</option>
   </select>
  </div>
  <!-- Sort -->
  <div class="relative m-[2px] mb-3 float-right hidden sm:block p-2">
   <label for="inputFilter" class="inline">Ordenar&nbsp;Por:</label>
   <select id="inputFilter"
       class="block w-40 rounded-lg border p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
       v-model="filters.order">
    <option value="most_recent" selected>Mais Recente</option>
    <option value="least_recent">Mais Antigo</option>
    <option value="nome_asc">Nome Ascendente</option>
    <option value="nome_desc">Nome Descedente</option>
   </select>
  </div>

  <!-- Table -->
   <table class="min-w-full text-left whitespace-nowrap">

   <!-- Table head -->
   <thead class="capitalize tracking-wider sticky top-0 bg-neutral-50">
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
     :class="{'bg-neutral-50': index % 2 === 1, 'bg-gradient-to-br from-slate-100 to-slate-300': admin.id == userStore.user?.id}">
    <th scope="row" class="px-6 py-4">
     <img v-if="admin.photo_url" class="h-10 w-10 rounded-full my-2"
        :src="serverBaseUrl + '/storage/fotos/' + admin.photo_url">
     <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="inline-block mr-12 rounded-full ring-2 bg-white/10 ring-indigo-700/30 text-indigo-700/70 w-10 h-10">
      <path fill-rule="evenodd"
         d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
         clip-rule="evenodd"/>
     </svg>
    </th>
    <td class="px-6 py-4">{{ admin.nome }}</td>
    <td class="px-6 py-4">{{ admin.email }}</td>
    <td class="px-6 py-4 space-x-1">
     <button v-if="admin.authorized" :disabled="admin.id == userStore.user?.id"
         @click="()=>userStore.blockAdmin(admin.id)"
         class="disabled:bg-gray-500 text-white font-bold rounded-lg w-5/12"
         :class="{'bg-yellow-400 hover:bg-yellow-500': admin.blocked, 'bg-green-600 hover:bg-green-700': !admin.blocked}">
      {{ admin.blocked ? 'Desbloquear' : 'Bloquear' }}
     </button>
     <button v-if="!admin.authorized"
         @click="()=>userStore.authorizeAdmin(admin.id)"
         class="w-5/12 text-white font-bold rounded-lg bg-orange-500 hover:bg-orange-700">Autorizar
     </button>
     <button class="bg-red-600 text-white font-bold rounded-lg w-5/12" @click="()=>{deleting = admin}">
      Eliminar
     </button>
    </td>
   </tr>
   </tbody>
  </table>

  <nav class="mt-5 flex items-center justify-between text-sm p-4" aria-label="Page navigation example">
   <p>
    A mostrar <strong>{{ userStore.pagination_data.from }}-{{ userStore.pagination_data.to }}</strong> de
    <strong>{{ userStore.pagination_data.total }}</strong>
   </p>

   <ul class="list-style-none flex">
    <li>
     <button :disabled="userStore.pagination_data.current_page == 1"
         class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300"
         :class="{'hover:bg-neutral-100': userStore.pagination_data.current_page > 1}"
         @click="applyFilters(userStore.pagination_data.current_page - 1)"
     >
      Anterior
     </button>
    </li>
    <li v-for="int in userStore.pagination_data.last_page">
     <button
       class="relative block rounded px-3 py-1.5 text-sm transition-all duration-300 "
       :class="{'bg-blue-100 text-blue-700': userStore.pagination_data.current_page == int, 'bg-transparent text-neutral-600 hover:bg-neutral-100' : userStore.pagination_data.current_page != int}"
       @click="applyFilters(int)"
     >
      {{ int }}
     </button>
    </li>
    <li>
     <button
       :disabled="userStore.pagination_data.current_page == userStore.pagination_data.last_page"
       class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300"
       :class="{'hover:bg-neutral-100': userStore.pagination_data.current_page == userStore.pagination_data.last_page}"
       @click="applyFilters(userStore.pagination_data.current_page + 1)"
     >
      Seguinte
     </button>
    </li>
   </ul>
  </nav>
 </div>
 <div v-if="deleting"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
  <SimpleDeleteForm bg="white" v-if="deleting" @cancel="()=>deleting=null"
           @delete="()=>{userStore.deleteAdmin(deleting.id); deleting=null}"
           :obj_to_delete="deleting"></SimpleDeleteForm>
 </div>

</template>