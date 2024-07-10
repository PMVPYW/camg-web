<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({target: {type: Number, default: 0}})

const current_value = ref(0)
const animateValue = () => {
  let start = 0;
  const target = props.target;
  const distance = Math.abs(target);
  const duration = 200;
  const steps = duration / 10; // Number of updates (every 10ms)
  const increment = distance / steps * (target >= 0 ? 1 : -1);
  
  console.log("Increment per step:", increment);
  
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    current_value.value = current;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      current_value.value = target; // Ensure final value is exactly the target
      clearInterval(timer);
    }
  }, 10); // Update every 10ms for smoother animation
};


    onMounted(()=>{
        animateValue()
    })
</script>
<template>{{ current_value - parseInt(current_value) > 0 ? current_value.toFixed(2) : current_value }}</template>