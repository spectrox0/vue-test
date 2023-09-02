<template>
  <!-- Organism , Component Navbar maked with Vuetify with nav items (home , menus , users and logout)  -->
  <header class="navbar">
    <v-app-bar flat app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vue js Test</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        v-for="item in items"
        :key="item.title"
        :color="item.color"
        @click="item.onClick"
        flat
        >{{ item.title }}</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          color="primary"
          @click="item.onClick"
        >
          <v-list-item-content class="d-flex flex-row align-center">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
//get router
import { useRouter } from "vue-router";
const router = useRouter();

// get authToken from store with pinia
import { useUserStore } from "@/store";
const { logout } = useUserStore();

const drawer = ref(false);

const handleLogout = () => {
  logout();
  router.replace("/login");
};
const items = [
  { title: "Home", icon: "mdi-home", onClick: () => router.push("/") },
  { title: "Menus", icon: "mdi-menu", onClick: () => router.push("/menus") },
  { title: "Users", icon: "mdi-account", onClick: () => router.push("/users") },
  {
    title: "Logout",
    icon: "mdi-logout",
    onClick: handleLogout,
    color: "error",
  },
];
//Logout function
</script>

<style lang="scss" scoped>
.navbar {
  .v-app-bar {
    .v-toolbar__title {
      font-size: 24px;
    }
  }
}
</style>
