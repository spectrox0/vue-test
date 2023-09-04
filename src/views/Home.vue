<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <!--  title welcome to the user -->
      <h1>Welcome {{ user?.name }}</h1>
      <!-- Iterate in menus  recursively  -->
      <v-row align="start"
        ><v-col cols="4" v-for="itemMenu in menus" :key="itemMenu.id"
          ><v-card class="mx-auto">
            <menu-vue :menu="itemMenu" /> </v-card></v-col
      ></v-row>
      <!-- loading spinner  -->
    </v-responsive>
  </v-container>
  <loading-screen :loading="loading" />
</template>

<script lang="ts" setup>
import { useFetchMenus } from "@/composables";
import { onMounted } from "vue";
import MenuVue from "@/components/molecules/Menu/Menu.vue";
import LoadingScreen from "@/components/molecules/LoadingScreen/LoadingScreen.vue";
import { useUserStore } from "@/store";
//Receive props from parent component
const { user } = useUserStore();
const { data: menus, doFetch, loading } = useFetchMenus();
// get user from store

// get user from pinia store to show in the title welcome
onMounted(doFetch);
</script>
