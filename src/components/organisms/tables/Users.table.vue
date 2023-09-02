<!-- Table CRUD Users maked with vuetify 3 and vue 3-->
<template>
  <div class="users-table">
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <!-- Edit button icon  -->
        <div class="v-btn-group">
          <v-btn
            color="success"
            flat
            icon
            size="small"
            @click="editUser(item.raw)"
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
        <v-btn color="primary" @click="doFetch"> Reset </v-btn>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { User } from "@/models";
import { useFetchUsers } from "@/composables";
import { useToast } from "vue-toastification";
import { userService } from "@/services/user";
// get router
import { useRouter } from "vue-router";
import { computed } from "vue";

// Router Hook
const router = useRouter();
// Toast Hook
const toast = useToast();
//Get users

const { data: users, doFetch, error: _, authToken, loading } = useFetchUsers();

// get authToken from store with pinia
const headers: {
  title: string;
  align: "start" | "end" | "center";
  sortable: boolean;
  key: string;
}[] = [
  { title: "Username", align: "start", sortable: true, key: "username" },
  { title: "Name", align: "start", sortable: true, key: "name" },
  { title: "Email", align: "start", sortable: true, key: "email" },
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

//Computed value from idDelete to open dialog delete user that depends directly from idDelete
const dialogDelete = computed(() => idDelete.value !== undefined);

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

const editUser = async (userId: User) => {
  await router.push("/users/edit/" + userId.id);
};
const deleteUser = async (userId: number) => {
  try {
    await userService.delete(userId.toString(), authToken);
    users.value = users.value?.filter((u) => u.id !== userId);
    toast.success("User deleted successfully");
  } catch (error) {
    if (error instanceof Error && error.message) {
      toast.error(error.message);
    }
  }
};
</script>
