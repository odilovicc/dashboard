<template>
  <h1 class="font-regular">Generate number</h1>

  <div class="py-4 flex gap-12">
    <CInput type="number" label="From" v-model.number="from"/>
    <CInput type="number" label="To" v-model.number="to"/>
  </div>
  <div class="flex justify-between">
    <Button label="Generate!" @click="generate"/>
    <Button label="Clear" variant="alternative" v-if="result.length > 0" @click="result.length"/>

  </div>
  <p>{{ result }}</p>
</template>

<script setup>
import CInput from "@/components/ui/Input.vue";
import {ref} from 'vue';
import Button from "@/components/ui/Button.vue";
import {useToast} from "vue-toast-notification";

const from = ref(0);
const to = ref(0);
const result = ref("");
const toast = useToast()

function generate() {
  result.value = getRandomNumber(from.value, to.value).toString();
}

function getRandomNumber(min, max) {
  breakme: if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error("Both min and max must be numbers.");
  } else if (min > max) {
    toast.open({
      message: "The minimum value must be less than or equal to the maximum value.",
      type: "error",
    });
    break breakme;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;

}
</script>
