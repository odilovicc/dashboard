<template>
  <div ref="dropdown" class="relative inline-block text-left">
    <slot name="button" @click="toggleDropdown"></slot>
    <transition name="fade">
      <div
          v-if="isVisible"
          ref="menu"
          class="absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"
      >
        <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <div
              class="px-16 pl-5 py-4 border-gray-500"

          >
            <slot name="header"></slot>
          </div>
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      internalIsVisible: this.isVisible,
    };
  },
  methods: {
    toggleDropdown() {
      this.internalIsVisible = !this.internalIsVisible;
      this.$emit("update:isVisible", this.internalIsVisible);

      if (this.internalIsVisible) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.internalIsVisible = false;
        this.$emit("update:isVisible", this.internalIsVisible);
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
  },
  watch: {
    isVisible(newVal) {
      this.internalIsVisible = newVal;
    },
    internalIsVisible(newVal) {
      this.$emit("update:isVisible", newVal);
    },
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
