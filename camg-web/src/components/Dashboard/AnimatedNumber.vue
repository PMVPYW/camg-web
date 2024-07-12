<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({target: {type: Number, default: 0}})

const current_value = ref(0)
const animateValue = (start = 0, duration = 200) => {
  const target = props.target;
  const distance = Math.abs(target-start);
  const steps = duration / 10; // Number of updates (every 10ms)
  const increment = distance / steps * (target >= start ? 1 : -1);
  
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

watch(()=>props.target, ()=>{
  animateValue(current_value.value, 500);
})


    onMounted(()=>{
        animateValue()
    })
</script>
<template>{{ current_value - parseInt(current_value) > 0 ? current_value.toFixed(2) : current_value }}</template>