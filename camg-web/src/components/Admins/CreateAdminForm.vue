<script setup>
  import {ref} from "vue";

  const photo_url = ref(null);
</script>

<template>
  <div class="w-full border-b mb-2 rounded-lg h-full flex">
    <div class="m-2 w-full mx-auto rounded-lg text-center">
      <form>
        <input type="text" placeholder="Nome"
               class="w-11/12 lg:w-1/2 bg-[#f8f9fe] m-2 rounded-md text-black  text-center border-2 h-10" required>
        <input class="w-11/12 lg:w-5/12 bg-[#f8f9fe] m-2 rounded-md text-black text-center border-2 h-10" placeholder="email" type="email" required>
        <input class="w-11/12 lg:w-6/12 bg-[#f8f9fe] m-2 rounded-md text-black text-center border-2 h-10" placeholder="password" type="email" required>
        <input class="w-11/12 lg:w-5/12 bg-[#f8f9fe] m-2 rounded-md text-black text-center border-2 h-10" placeholder="confirmar password" type="email" required>
        <div class="sm:col-span-9">
          <div class="flex items-center gap-5">
            <div v-if="photo_url">
              <img class="inline-block h-16 w-16 rounded-full ring-2 ring-white/30"
                   :src="photo_url"
                   alt="Image Description">
            </div>
            <div v-else>
              <img class="inline-block h-16 w-16 rounded-full ring-2 ring-white/30"
                   :src="`../../../src/assets/default_user_foto.jpg`"
                   alt="Image Description">

            </div>
            <div class="flex gap-x-2">
              <div>
                <input type="file" accept="image/png, image/gif, image/jpeg" class="block w-full text-sm text-gray-500
                    file:me-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-white/20 file:text-white
                    hover:file:bg-white/20
                    file:disabled:opacity-50 file:disabled:pointer-events-none
                    dark:file:bg-white/30
                    dark:hover:file:bg-white/20
                  "
                       @change="($event)=>{photo_url = $event.target.files[0]; alert('i')}">
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
