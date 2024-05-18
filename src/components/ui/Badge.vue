<template>
  <span :class="badgeClasses">{{ text }}</span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'blue',
      validator(value) {
        return ['blue', 'gray', 'red', 'green'].includes(value);
      }
    }
  },
  computed: {
    badgeClasses() {
      return [
        'text-xs',
        'font-medium',
        'px-2.5',
        'py-0.5',
        'rounded',
        {
          'bg-blue-100': this.color === 'blue',
          'text-blue-800': this.color === 'blue',
          'dark:bg-blue-900': this.color === 'blue',
          'dark:text-blue-300': this.color === 'blue',
          'bg-gray-100': this.color === 'gray',
          'text-gray-800': this.color === 'gray',
          'dark:bg-gray-700': this.color === 'gray',
          'dark:text-gray-300': this.color === 'gray',
          'bg-red-100': this.color === 'red',
          'text-red-800': this.color === 'red',
          'dark:bg-red-900': this.color === 'red',
          'dark:text-red-300': this.color === 'red',
          'bg-green-100': this.color === 'green',
          'text-green-800': this.color === 'green',
          'dark:bg-green-900': this.color === 'green',
          'dark:text-green-300': this.color === 'green'
        }
      ];
    }
  }
};
</script>

<style scoped>
.me-2 {
  margin-right: 0.5rem;
}
</style>
