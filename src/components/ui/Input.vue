<template>
  <div>
    <label
        for="input"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <input
        :type="type"
        :value="modelValue"
        @input="onInput"
        id="input"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="label"
        required
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number], // Используем массив для разрешения нескольких типов
    label: String,
    type: {
      type: String,
      default: "text",
    }
  },
  methods: {
    onInput(event) {
      const value = this.type === "number" ? parseFloat(event.target.value) : event.target.value;
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
