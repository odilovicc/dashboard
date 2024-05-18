<template>
  <div>
    <div class="flex flex-col gap-5">
      <Button @clicked="openAddNote" label="Add task"></Button>
      <Modal :is-open="isAddNoteOpen" @close="isAddNoteOpen = false" title="Add task">
        <div class="flex flex-col gap-5">
          <Input v-model="note" label="Task title"/>
          <TArea v-model="description" label="Task description"/>
          <div class="flex gap-3 items-center">
            <Input type="date" label="Task timeout" v-model="willBeDeleted"/>
          </div>
          <Button label="Add task" @clicked="addNote"/>
        </div>
      </Modal>
      <Tabs :tabs="tabs">
        <template #tab1>
          <div v-for="note in activeNotes" :key="note.id" class="mb-4">
            <div class="flex items-center justify-between p-5 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <h1 class="text-lg md:text-2xl font-semibold" v-html="highlightTags(note.title)"></h1>
              <div class="flex items-center gap-2">
                <Button variant="alternative" icon-left="pi pi-check" @clicked="doneNote(note)"/>
                <Button variant="default" icon-left="pi pi-times" @clicked="deleteNote(note)"/>
                <Button variant="default" icon-left="pi pi-info" @clicked="openModal(note.id)"/>
                <Modal :isOpen="isModalOpen[note.id]" @close="closeModal(note.id)" title="Note Details">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center">
                      <h1 class="font-semibold">Title:</h1>
                      <p class="text-sm" v-html="highlightTags(note.title)"></p>
                    </div>
                    <div class="flex items-center">
                      <h1 class="font-semibold">Description:</h1>
                      <p class="text-sm" v-if="note.description">{{ note.description }}</p>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </template>
        <template #tab2>
          <div v-for="note in completedNotes" :key="note.id" class="mb-4">
            <div class="flex items-center justify-between p-5 rounded-md dark:bg-gray-800 dark:border-gray-700">
              <h1 class="md:text-2xl text-lg font-semibold line-through" v-html="highlightTags(note.title)"></h1>
              <div class="flex items-center gap-2">
                <Button variant="default" icon-left="pi pi-times" @clicked="deleteCompletedNote(note)"/>
                <Button variant="default" icon-left="pi pi-info" @clicked="openModal(note.id)"/>
                <Modal :isOpen="isModalOpen[note.id]" @close="closeModal(note.id)" title="Note Details">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center">
                      <h1 class="font-semibold">Title:</h1>
                      <p class="text-sm" v-html="highlightTags(note.title)"></p>
                    </div>
                    <div class="flex items-center">
                      <h1 class="font-semibold">Description:</h1>
                      <p class="text-sm" v-if="note.description">{{ note.description }}</p>
                      <p class="text-sm text-red-500" v-else>Description is not attached!</p>
                    </div>
                    <div class="flex items-center">
                      <h1 class="font-semibold">Done time:</h1>
                      <p class="text-sm">{{ note.timeCompleted }}</p>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Modal from "../components/ui/Modal.vue";
import TArea from "../components/ui/TArea";
import Tabs from "../components/ui/Tabs.vue";
import {ref, onMounted, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toast-notification";

const tabs = [
  {label: "Tasks", name: "tab1"},
  {label: "Completed tasks", name: "tab2"},
];

const note = ref("");
const description = ref("");
const willBeDeleted = ref("");

const now = new Date();

const store = useStore();
const toast = useToast();

const notes = computed(() => store.state.notes);
const activeNotes = computed(() => notes.value.filter((note) => !note.completed));
const completedNotes = computed(() => notes.value.filter((note) => note.completed));
const isModalOpen = ref({});
const isAddNoteOpen = ref(false)

onMounted(() => {
  store.dispatch("getNotes");
});

async function addNote() {
  try {
    const todayString = now.toLocaleDateString('en-CA');
    const todayNumber = new Date(todayString).getTime();
    const willBeDeletedDate = new Date(willBeDeleted.value).getTime();

    if (note.value.length <= 0 || description.value.length <= 0 || willBeDeleted.value.length <= 0) {
      toast.error("Fill all fields");
    } else if (willBeDeletedDate <= todayNumber) {
      toast.error("It must be 'timeout > today'");
    } else {
      await store.dispatch("addNote", {
        title: note.value,
        description: description.value,
        completed: false,
        willBeDeleted: willBeDeleted.value,
      });
      note.value = "";
      description.value = "";
      willBeDeleted.value = "";
      toast.success("Task has been added");
      isAddNoteOpen.value = false
    }
  } catch (e) {
    toast.error(e.message || e);
  }
}

async function doneNote(note) {
  try {
    await store.dispatch("doneNote", note);
    toast.success("Task has been done");
  } catch (e) {
    toast.error(e.message || e);
  }
}

async function deleteNote(note) {
  try {
    store.dispatch("deleteNote", note);
    toast.success("Task has been deleted");
  } catch (e) {
    toast.error(e.message || e);
  }
}

async function deleteCompletedNote(note) {
  try {
    store.dispatch("deleteNote", note);
    toast.success("Task has been deleted");
  } catch (e) {
    toast.error(e.message || e);
  }
}

function openModal(noteId) {
  isModalOpen.value = {...isModalOpen.value, [noteId]: true};
}

function openAddNote() {
  isAddNoteOpen.value = !isAddNoteOpen.value
}

function closeModal(noteId) {
  isModalOpen.value = {...isModalOpen.value, [noteId]: false};
}

function highlightTags(text) {
  return text.replace(/#(\w+)/g, '<span class="highlight-tag">#$1</span>');
}
</script>


