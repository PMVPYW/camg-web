<script setup>

const props = defineProps(["titulo"])

</script>
<template>
    <div class="w-[30%] m-2 p-2 border-2 rounded-xl">
        <div class="w-full border-b-2 text-center text-lg">{{ props.titulo }}</div>
        <slot></slot>
    </div>
</template>