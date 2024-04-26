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
    </div>
  </div>

</template>

<style scoped>

</style>