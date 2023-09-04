<template>
  <v-dialog v-model="loading" fullscreen>
    <v-container fluid class="fill-height align-center justify-center d-flex">
      <v-progress-circular size="64" indeterminate color="primary">
      </v-progress-circular>
    </v-container>
  </v-dialog>
</template>

<script lang="ts" setup>
import { toRef } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const loading = toRef(props.loading);
</script>
