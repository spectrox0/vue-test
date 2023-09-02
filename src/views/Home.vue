<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <!--  title welcome to the user -->
      <h1>Welcome {{ user?.name }}</h1>
      <!-- Iterate in menus  recursively  -->
      <v-row align="start"
        ><v-col cols="4" v-for="itemMenu in menus" :key="itemMenu.id"
          ><v-card class="mx-auto" min-height="300px">
            <menu-vue :menu="itemMenu" /> </v-card></v-col
      ></v-row>
      <!-- loading spinner  -->
    </v-responsive>
  </v-container>

  <v-dialog v-model="loading" fullscreen>
    <v-container fluid class="fill-height align-center justify-center d-flex">
      <v-progress-circular size="64" indeterminate color="primary">
      </v-progress-circular>
    </v-container>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useFetchMenus } from "@/composables";
import { onMounted } from "vue";
import MenuVue from "@/components/molecules/Menu/Menu.vue";
import { useUserStore } from "@/store";
//Receive props from parent component
const { user } = useUserStore();
const { data: menus, doFetch, loading } = useFetchMenus();
// get user from store

// get user from pinia store to show in the title welcome

onMounted(() => {
  doFetch();
});
</script>
