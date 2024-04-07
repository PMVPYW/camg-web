<script setup>
const props = defineProps(["title", "opened"]);
</script>

<template>
  <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" :class="{'opacity-0 pointer-events-none': props.opened === false} ">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white max-w-11/12 h-4/5 mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-center mx-auto text-center items-center pb-3">
          <p class="text-2xl font-bold">{{props.title}}</p>
        </div>
        <div class="flex justify-center m-2 p-2 mx-auto">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
