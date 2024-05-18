<template>
  <div>
    <div class="flex border-b border-gray-700">
      <div
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectTab(index)"
          :class="['cursor-pointer px-4 py-2', selectedIndex === index ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400']"
          class="hover:text-blue-300"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="py-4">
      <slot :name="tabs[selectedIndex].name"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const selectedIndex = ref(0);

function selectTab(index) {
  selectedIndex.value = index;
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
