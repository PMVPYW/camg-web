<script setup>
const props = defineProps(["title", "opened"]);
const emit = defineEmits(["closeModal"]);
document.onkeydown = (event)=>{
 event = event || window.event;
 if ("key" in event) {
  if (event.key == "Escape" || event.key == "Esc" )//esc
  {
   emit('closeModal');
  }
 }
}
</script>

<template>
 <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" :class="{'opacity-0 pointer-events-none': props.opened === false} ">
  <div class="modal-overlay absolute w-full h-fit bg-gray-900 opacity-50 "></div>

  <div class="modal-container bg-white w-8/12 h-5/6 my-2 py-2 mx-auto rounded-2xl shadow-lg z-50 overflow-y-auto border-2 border-gray-300">
   <!-- Add margin if you want to see some of the overlay behind the modal-->
   <div class="modal-content text-left px-6 h-full">
    <div class="h-full flex flex-col justify-center items-center mx-auto max-h-[95%] overflow-auto">
     <slot/>
    </div>
   </div>
  </div>
 </div>
</template>
