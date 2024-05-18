<template>
  <div>
    <div class="p-5 bg-gray-800 text-white rounded-md border border-gray-500 flex justify-between items-center">
      <h1>Welcome Bakhtiyor</h1>
      <Dropdown v-model:isVisible="isDropToggled">
        <template #button>
          <Button icon-left="pi pi-bell" class="relative" variant="rounded-alternative"
                  @click="isDropToggled = !isDropToggled">
            <template #badge>
              <div v-if="filteredNotes.length"
                   class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-800">
                {{ filteredNotes.length }}
              </div>
            </template>
          </Button>
        </template>
        <template #header>
          <p v-if="filteredNotes.length > 0">You have undone tasks!</p>
          <p v-else>You are free today!</p>
        </template>
        <template #content>
          <div
              v-if="filteredNotes.length > 0"
              class="text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <router-link to="/notes" v-for="task in filteredNotes"
                         class="flex items-center gap-2 px-4 py-2 border-y border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <Badge text="Undone" color="red"/>
              {{ task.title }}
            </router-link>
          </div>
        </template>
      </Dropdown>
    </div>

    <h1 class="text-xl font-semibold my-6">Widgets</h1>
    <div class="rounded-md p-5 bg-gray-800 border border-gray-500 md:w-max">
      <generate-number/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {useStore} from "vuex";
import Button from "@/components/ui/Button.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import GenerateNumber from "@/components/widgets/generateNumber.vue";
import Badge from "@/components/ui/Badge.vue";

const store = useStore();
const isDropToggled = ref(false);

const notifications = computed(() => store.state.notes);

const filteredNotes = computed(() => {
  return notifications.value.filter((note) => !note.completed);
});

onMounted(() => {
  store.dispatch("getNotesHome");
});
</script>
