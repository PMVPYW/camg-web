<script setup>
import {useUserStore} from "@/stores/user.js";
import {inject, ref} from "vue";
import CreateAdminForm from "@/components/Admins/CreateAdminForm.vue";
import AdminsTable from "@/components/Admins/AdminsTable.vue";

const userStore = useUserStore();

const serverBaseUrl = inject("serverBaseUrl");

const creating = ref(false);
</script>

<template>
  <div class="h-full rounded-xl transition-all duration-200 w-full" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Administradores</h1>
    <div class="w-11/12 mt-10">
      <AdminsTable></AdminsTable>

      <table v-if="creating" class="table-auto min-w-full text-center mt-10 m-2">
        <thead class="border-b border-neutral-200 font-medium">
        <tr class="w-full ">
          <td class="w-2/12 font-bold px-6 py-4">Foto</td>
          <td class="w-3/12 font-bold px-6 py-4">Nome</td>
          <td class="w-3/12 font-bold px-6 py-4">Email</td>
          <td class="w-4/12 font-bold px-6 py-4">Ações<button class="text-white ml-4 px-4 rounded-lg" :class="{'bg-green-600 hover:bg-green-700': !creating, 'bg-red-600 hover:bg-red-700':creating}" @click="()=>{creating = !creating}">{{!creating ? "Criar" : "Cancelar"}}</button></td>
        </tr>
        <tr v-if="creating">
          <td colspan="4">
          <CreateAdminForm></CreateAdminForm>
          </td>
        </tr>
        </thead>
        <tr v-for="admin in userStore.admins" class="border-b hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-200"
            :class="{'bg-gradient-to-br from-slate-100 to-slate-300': admin.id == userStore.user.id}">
          <td class="px-6 py-4 whitespace-nowrap">
            <img class="h-10 w-10 rounded-full mx-auto my-2"
                 :src="admin.photo_url ?  serverBaseUrl + '/storage/fotos/' + admin.photo_url : '../../../src/assets/default_user_foto.jpg'">
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ admin.nome }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ admin.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap mx-auto space-x-1">
            <button :disabled="admin.id == userStore.user.id" @click="()=>userStore.blockAdmin(admin.id)"
                    class="disabled:bg-gray-500 text-white font-bold rounded-lg w-5/12"
                    :class="{'bg-yellow-400 hover:bg-yellow-500': admin.blocked, 'bg-green-600 hover:bg-green-700': !admin.blocked}">
              {{ admin.blocked ? 'Desbloquear' : 'Bloquear' }}
            </button>
            <button v-if="!admin.authorized"
                    class="w-11/12 text-white font-bold rounded-lg bg-orange-600 hover:bg-orange-700">Autorizar
            </button>
            <button class="bg-red-600 text-white font-bold rounded-lg w-5/12" @click="userStore.deleteAdmin(admin.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>

</template>

<style scoped>

</style>