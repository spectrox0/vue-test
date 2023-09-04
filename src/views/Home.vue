<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height mx-auto" max-width="920px">
      <!--  title welcome to the user -->
      <h1 class="mb-4">Welcome {{ user?.name }}</h1>
      <!-- Iterate in menus  recursively  -->
      <grid-menu :menus="menus" v-if="menus" />
      <!-- loading spinner  -->
    </v-responsive>
  </v-container>
  <loading-screen :loading="loading" />
</template>

<script lang="ts" setup>
import { useFetchMenus } from "@/composables";
import { onMounted } from "vue";
import GridMenu from "@/components/organisms/GridMenu/GridMenu.vue";
import LoadingScreen from "@/components/molecules/LoadingScreen/LoadingScreen.vue";
import { useUserStore } from "@/store";
//Receive props from parent component
const { user } = useUserStore();
const { data: menus, doFetch, loading } = useFetchMenus();
// get user from store

// get user from pinia store to show in the title welcome
onMounted(() => doFetch(undefined));
</script>
