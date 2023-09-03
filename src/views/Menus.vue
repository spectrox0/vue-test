<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <section id="menu-view">
        <div
          class="d-flex align-center justify-space-between table-header mb-3"
        >
          <h1>Menus</h1>
          <v-btn color="primary ml-auto" @click="handleCreate">
            <v-icon>mdi-plus</v-icon>
            <span class="ml-1">Create</span>
          </v-btn>
        </div>
        <menu-table />
      </section>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import MenuTable from "@/components/organisms/tables/Menu.table.vue";

const router = useRouter();

const handleCreate = () => {
  router.push("/menus/create");
};
</script>
