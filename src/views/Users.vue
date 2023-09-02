<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <section>
        <h1>Users</h1>
        <users-table />
      </section>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import UsersTable from "@/components/organisms/tables/Users.table.vue";
</script>
