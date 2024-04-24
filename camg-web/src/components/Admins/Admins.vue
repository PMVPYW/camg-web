<script setup>
import {useUserStore} from "@/stores/user.js";
import {inject} from "vue";

const userStore = useUserStore();

const serverBaseUrl = inject("serverBaseUrl");
</script>

<template>
  <div class="h-full rounded-xl transition-all duration-200 w-full" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Administradores</h1>
      <table class="table-auto w-11/12 text-center mt-10">
        <tr class="border-4 border-opacity-100 rounded-lg border-[#6a7a90] w-full ">
          <td class="border-2 w-2/12 bg-green-300">Foto</td>
          <td class="border-2 w-3/12 bg-blue-300">Nome</td>
          <td class="border-2 w-3/12 bg-red-300">Email</td>
          <td class="border-2 w-4/12 bg-yellow-300">Status</td>
        </tr>
        <tr v-for="admin in userStore.admins" class="border-4 rounded-2xl" :class="{'bg-gradient-to-br from-slate-100 to-slate-300': admin.id == userStore.user.id}">
          <td>
            <img class="h-10 w-10 rounded-full mx-auto my-2" :src="admin.photo_url ?  serverBaseUrl + '/storage/fotos/' + admin.photo_url : '../../../src/assets/default_user_foto.jpg'">
          </td>
          <td>{{ admin.nome }}</td>
          <td>{{ admin.email }}</td>
          <td class="w-full mx-auto space-x-1">
            <button :disabled="admin.id == userStore.user.id" @click="()=>userStore.blockAdmin(admin.id)" class="disabled:bg-gray-500 text-white font-bold rounded-lg" :class="{'bg-red-600 hover:bg-red-700': admin.blocked, 'bg-green-600 hover:bg-green-700': !admin.blocked, 'w-5/12': !admin.authorized, 'w-11/12': admin.authorized}">{{ admin.blocked ? 'Desbloquear' : 'Bloquear'}}</button>
            <button v-if="!admin.authorized" class="w-11/12 text-white font-bold rounded-lg bg-yellow-600 hover:bg-red-700">Autorizar</button>
          </td>
        </tr>
      </table>
  </div>

</template>

<style scoped>

</style>