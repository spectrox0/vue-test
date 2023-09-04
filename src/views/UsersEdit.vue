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
        <h1>User Edit</h1>
      </div>
      <v-card class="pa-5 rounded-lg my-3">
        <user-form v-if="user" :user-to-edit="user" />
      </v-card>
    </v-responsive>
  </v-container>
  <loading-screen :loading="loading" />
</template>

<script lang="ts" setup>
import UserForm from "@/components/organisms/forms/UserForm.vue";
import { useServiceFetch } from "@/composables";
import { userService } from "@/services";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingScreen from "@/components/molecules/LoadingScreen/LoadingScreen.vue";
import { useToast } from "vue-toastification";
import { ROUTES_NAMES } from "@/utils";
const route = useRoute();
const { data: user, doFetch, loading } = useServiceFetch(userService.get);
const toast = useToast();
const router = useRouter();

onMounted(async () => {
  const id = route.params.id;
  if (typeof id !== "string") {
    toast.error("Error getting the user ");
    router.replace({ name: ROUTES_NAMES.USERS });
    return;
  }
  try {
    await doFetch(id);
  } catch {
    router.replace({ name: ROUTES_NAMES.USERS });
  }
});
const handleBack = () => {
  router.push({ name: ROUTES_NAMES.USERS });
};
//Get id user of route params
</script>
