<template>
  <div class="table-wrapper">
    <input-search label="Search Menu" @onsubmit="searchMenu" />
    <v-data-table
      :headers="headers"
      :items="flattenMenus"
      :loading="loading"
      class="elevation-1"
    >
      <!--  eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <!-- Edit button icon  -->
        <div class="v-btn-group">
          <v-btn flat icon size="small" @click="openMenus(item.raw.id)">
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
    <v-dialog v-model="dialogMenus" max-width="480px">
      <v-card>
        <v-card-title class="text-h5">Menus</v-card-title>
        <div class="pa-4">
          <grid-menu :menus="currentMenu" v-if="currentMenu" />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            class="align-self-end"
            variant="text"
            @click="closeMenus"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useFetchMenus } from "@/composables";
import { useToast } from "vue-toastification";
import { menuService } from "@/services";
// get router
import { useRouter } from "vue-router";
import { computed } from "vue";
import InputSearch from "@/components/atoms/InputSearch/InputSearch.vue";
import { ROUTES_NAMES } from "@/utils";
import { flattenTree } from "@/utils/flattenTree";
import GridMenu from "@/components/organisms/GridMenu/GridMenu.vue";
import { Menu } from "@/models";
// Router Hook
const router = useRouter();
// Toast Hook
const toast = useToast();
//Get users

const { data: menus, doFetch, authToken, loading } = useFetchMenus();
const currentMenu = ref<[Menu]>();
// get authToken from store with pinia
const headers: {
  title: string;
  align: "start" | "end" | "center";
  sortable: boolean;
  key: string;
}[] = [
  { title: "Name", align: "start", sortable: true, key: "name" },
  { title: "Parent", align: "start", sortable: true, key: "parent.name" },
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

const flattenMenus = computed(() => flattenTree(menus.value || []));

const getMenuTree = (id: number, array: Menu[]): Menu | undefined => {
  for (const menu of array) {
    if (menu.id === id) {
      return menu;
    }
    if (menu.children?.length) {
      const found = getMenuTree(id, menu.children);
      if (found) {
        return found;
      }
    }
  }
};
const openMenus = (id: number) => {
  if (!menus.value) return;
  const menuTree = getMenuTree(id, menus.value);
  console.log(menuTree, id, menus.value);
  if (menuTree) {
    currentMenu.value = [menuTree];
  }
};
const closeMenus = () => {
  currentMenu.value = undefined;
};

//Computed value from idDelete to open dialog delete user that depends directly from idDelete
const dialogDelete = computed(() => idDelete.value !== undefined);

const dialogMenus = computed(() => currentMenu.value !== undefined);

// get all users from api when component mounted
onMounted(async () => {
  try {
    await doFetch(undefined);
  } catch (error) {
    if (error instanceof Error && error.message) {
      toast.error(error.message);
    }
  }
});

const searchMenu = async (searchField: string) => {
  await doFetch(searchField.trim() ? searchField : undefined);
};

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
  } finally {
    closeDelete();
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
