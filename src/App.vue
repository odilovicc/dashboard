<template>
  <Navbar/>
  <div class="p-4 sm:ml-64">
    <div class="p-4">
      <Transition>
        <router-view/>
      </Transition>
    </div>
  </div>

</template>
<script setup>
import Navbar from "./components/ui/Navbar.vue";
import {onMounted} from "vue";
import {initFlowbite} from "flowbite";

onMounted(() => initFlowbite())
</script>
