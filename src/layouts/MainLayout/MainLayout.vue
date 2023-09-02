<template>
  <v-app>
    <navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Navbar from "../../components/organisms/Navbar/Navbar.vue";
</script>
