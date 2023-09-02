<!-- Input search component is a simple input text with a search icon, this component is used in the header of the application to search and filter data in the table. 
    This component is used in the following components: UsersTable, MenusTable -->
<!-- This component will receive a prop called search, this prop is a string that will be used to filter the data in the table. -->
<template>
  <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    :label="label"
    single-line
    hide-details
    clearable
  ></v-text-field>
</template>

<script lang="ts" setup>
// import ref from vue to use the search prop
import { ref, watch } from "vue";
// Receive the search prop
const props = defineProps({
  search: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: "Search",
  },
});
// Create a search variable to use in the input text
const search = ref<string>(props.search);
// Watch the search prop to update the search variable
watch(
  () => props.search,
  (value) => {
    search.value = value;
  }
);
</script>
