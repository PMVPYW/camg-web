<script setup>
const props = defineProps(["title", "opened"]);
</script>

<template>
  <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" :class="{'opacity-0 pointer-events-none': props.opened === false} ">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white w-11/12 h-fit my-2 py-2 mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content text-left px-6">
        <div class="h-full flex flex-col justify-center items-center m-auto">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
