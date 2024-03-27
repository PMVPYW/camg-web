<script setup>
import Patrocinios from "@/components/Rallies/Patrocinios/Patrocinios.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Aside from "@/components/Aside/Aside.vue";
import Footer from "@/components/Footer/Footer.vue";
import { useRouter } from "vue-router";

const router = useRouter()

</script>

<template>
  <!-- Loopple Templates: https://www.loopple.com/templates | Copyright Loopple (https://www.loopple.com) | This copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. -->
  <Navbar></Navbar>
  <div class="bg-[#f8f9fe]">
      <div class="flex flex-row">
          <Aside></Aside>
          <router-view></router-view>
      </div>
      <Footer></Footer>
  </div>
</template>
