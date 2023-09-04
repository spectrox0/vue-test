<template>
  <div class="table-wrapper">
    <input-search :search="searchField" label="Search Menu" />
    <v-data-table
      :headers="headers"
      :items="menus"
      :loading="loading"
      class="elevation-1"
    >
      <!--  eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <!-- Edit button icon  -->
        <div class="v-btn-group">
          <v-btn flat icon size="small" @click="openMenus">
            <v-icon small>mdi-menu</v-icon>
          </v-btn>
          <v-btn
            color="success"
            flat
            icon
            size="small"
            @click="editUser(item.raw.id)"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <!-- Delete button icon  -->
          <v-btn
            color="error"
            flat
            icon
            size="small"
            @click="openDelete(item.raw.id)"
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:no-data>
        <p class="text-center">No data available</p>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
            >Cancel</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="deleteConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal to see all children menus  -->
    <v-dialog v-model="dialogMenus" max-width="1280px">
      <v-card>
        <v-card-title class="text-h5">Menus</v-card-title>
        <v-card-content>
          <v-row align="start"
            ><v-col cols="4" v-for="itemMenu in menus" :key="itemMenu.id"
              ><v-card class="mx-auto" min-height="300px">
                <menu-vue :menu="itemMenu" /> </v-card></v-col
          ></v-row>
        </v-card-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeMenus"
            >Close</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { User } from "@/models";
import { useFetchMenus } from "@/composables";
import { useToast } from "vue-toastification";
import { menuService } from "@/services";
// get router
import { useRouter } from "vue-router";
import { computed } from "vue";
import InputSearch from "@/components/atoms/InputSearch/InputSearch.vue";
import MenuVue from "@/components/molecules/Menu/Menu.vue";
import { ROUTES_NAMES } from "@/utils";
const searchField = ref<string>("");
// Router Hook
const router = useRouter();
// Toast Hook
const toast = useToast();
//Get users

const { data: menus, doFetch, authToken, loading } = useFetchMenus();

const idMenus = ref<number>();
// get authToken from store with pinia
const headers: {
  title: string;
  align: "start" | "end" | "center";
  sortable: boolean;
  key: string;
}[] = [
  { title: "Id", align: "start", sortable: true, key: "id" },
  { title: "Parent", align: "start", sortable: true, key: "parent" },
  { title: "Name", align: "start", sortable: true, key: "name" },
  { title: "Actions", align: "end", sortable: false, key: "actions" },
];

const idDelete = ref<number>();
const openDelete = (id: number) => {
  idDelete.value = id;
};
const closeDelete = () => {
  idDelete.value = undefined;
};
const deleteConfirm = () => {
  if (idDelete.value === undefined) return;
  deleteUser(idDelete.value);
};

const openMenus = (id: number) => {
  idMenus.value = id;
};
const closeMenus = () => {
  idMenus.value = undefined;
};

//Computed value from idDelete to open dialog delete user that depends directly from idDelete
const dialogDelete = computed(() => idDelete.value !== undefined);

const dialogMenus = computed(() => idMenus.value !== undefined);

// get all users from api when component mounted
onMounted(async () => {
  try {
    await doFetch();
  } catch (error) {
    if (error instanceof Error && error.message) {
      toast.error(error.message);
    }
  }
});

const editUser = async (id: number) => {
  await router.push({
    name: ROUTES_NAMES.MENUS_EDIT,
    params: { id: id.toString() },
  });
};
const deleteUser = async (userId: number) => {
  try {
    await menuService.delete(userId.toString(), authToken);
    menus.value = menus.value?.filter((u) => u.id !== userId);
    toast.success("Menu deleted successfully");
  } catch (error) {
    if (error instanceof Error && error.message) {
      toast.error(error.message);
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
