<!--  View to create users  -->
<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height ma-auto" max-width="600px">
      <div class="d-flex align-center">
        <v-btn
          prepend-icon="mdi-arrow-left"
          flat
          variant="outlined"
          class="mr-2"
          @click="handleBack"
          color="secondary"
        >
          Back
        </v-btn>
        <h1>Menu Create</h1>
      </div>
      <v-card class="pa-5 rounded-lg my-3">
        <menu-form />
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import MenuForm from "@/components/organisms/forms/MenuForm.vue";
import { ROUTES_NAMES } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter();
const handleBack = () => {
  router.push({ name: ROUTES_NAMES.MENUS });
};
</script>
