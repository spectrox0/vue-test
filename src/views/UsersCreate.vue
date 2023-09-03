<!--  View to create users  -->
<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <h1>User Creation</h1>
      <user-form />
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import UserForm from "@/organisms/forms/UserForm.vue";
</script>
