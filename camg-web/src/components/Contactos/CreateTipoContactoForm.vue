<script setup>
</script>
<template>
  <hr class="my-6">
  <form class="m-2">
    <div class="flex flex-row">
      <div class="w-full">
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-9/12">
            <div>
              <label class="block mb-2 text-base font-medium">Nome</label>
              <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome Tipo">
            </div>
        </div>
        <br>
      </div>
    </div>
    </div>
  </form>
  <hr class="my-6">
</template>