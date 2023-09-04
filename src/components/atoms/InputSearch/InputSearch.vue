<!-- Input search component is a simple input text with a search icon, this component is used in the header of the application to search and filter data in the table. 
    This component is used in the following components: UsersTable, MenusTable -->
<!-- This component will receive a prop called search, this prop is a string that will be used to filter the data in the table. -->
<template>
  <!--input vuetify with button to search and filter results  -->
  <form class="search-input-wrapper" @submit.prevent>
    <v-text-field
      v-model="search"
      density="compact"
      :placeholder="label"
      append-inner-icon="mdi-magnify"
      @click:append-inner="handleSubmit"
      :label="label"
      single-line
      hide-details
      clearable
    ></v-text-field>
    <v-btn type="submit" prepend-icon="mdi-magnify" flat> Search </v-btn>
  </form>
</template>

<script lang="ts" setup>
// import ref from vue to use the search prop
import { watch } from "vue";
import { ref } from "vue";
const search = ref<string>("");
// Receive the search prop
const emit = defineEmits(["onsubmit"]);
const handleSubmit = () => {
  emit("onsubmit", search.value);
};
const { label } = defineProps({
  label: {
    type: String,
    required: false,
    default: "Search",
  },
});

watch(search, () => {
  handleSubmit();
});

// Create a search variable to use in the input text
</script>

<style scoped>
.search-input-wrapper {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 0.5rem;
}
button[type="submit"] {
  margin: auto;
}
</style>
