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
        <h1>Menu Edit</h1>
      </div>
      <v-card class="pa-5 rounded-lg my-3">
        <menu-form v-if="menu" :menu-to-edit="menu" />
      </v-card>
    </v-responsive>
  </v-container>
  <loading-screen :loading="loading" />
</template>

<script lang="ts" setup>
import MenuForm from "@/components/organisms/forms/MenuForm.vue";
import { useServiceFetch } from "@/composables";
import { menuService } from "@/services";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingScreen from "@/components/molecules/LoadingScreen/LoadingScreen.vue";
import { useToast } from "vue-toastification";
import { ROUTES_NAMES } from "@/utils";
const route = useRoute();
const { data: menu, doFetch, loading } = useServiceFetch(menuService.get);
const toast = useToast();
const router = useRouter();

onMounted(async () => {
  const id = route.params.id;
  if (typeof id !== "string") {
    toast.error("Error getting the menu ");
    router.replace({ name: ROUTES_NAMES.MENUS });
    return;
  }
  try {
    await doFetch(id);
  } catch {
    router.replace({ name: ROUTES_NAMES.MENUS });
  }
});
const handleBack = () => {
  router.push({ name: ROUTES_NAMES.MENUS });
};
//Get id user of route params
</script>
