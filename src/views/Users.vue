<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <section>
        <div
          class="d-flex align-center justify-space-between table-header mb-3"
        >
          <h1>Users</h1>
          <v-btn color="primary ml-auto" @click="handleCreate">
            <v-icon>mdi-plus</v-icon>
            <span class="ml-1">Create</span>
          </v-btn>
        </div>
        <users-table />
      </section>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import UsersTable from "@/components/organisms/tables/Users.table.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleCreate = () => {
  router.push("/users/create");
};
</script>

<style scoped>
.table-header {
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
