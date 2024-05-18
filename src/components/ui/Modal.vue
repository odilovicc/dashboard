<template>
  <transition mode="out-in">
    <div
        v-if="isOpen"
        class="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-gray-800 rounded-lg shadow-lg w-[calc(100%-5rem)] md:w-1/3">
        <div class="p-4 flex justify-between items-center border-b border-gray-500">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <slot></slot>
        </div>
        <div class="p-4 flex justify-end border-t border-gray-500">
          <Button label="Close" @clicked="closeModal"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: "Modal Title",
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
