<template>
  <div>
    <label
        :for="label"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }}</label
    >
    <textarea
        :id="label"
        :value="modelValue"
        @input="onInput"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="label"
    ></textarea>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: String, // Объявляем проп modelValue
    label: String,
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
