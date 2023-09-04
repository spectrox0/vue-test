<template>
  <v-form class="form" ref="form" v-model="valid">
    <v-text-field
      v-model="menu.name"
      label="Name"
      :disabled="loading"
      :rules="[rules.required, rules.name]"
    ></v-text-field>
    <v-btn
      @click="submitForm"
      :disabled="!valid || !validateIfChangeExist"
      :loading="loading"
      size="large"
      >Submit</v-btn
    >
  </v-form>
</template>

<script lang="ts" setup>
import { Menu, MenuForm } from "@/models";
import { ref } from "vue";
import {
  ROUTES_NAMES,
  getPayloadToEdit,
  isEqualObject,
  commonValidation as rules,
} from "@/utils";
import { menuService } from "@/services";
import { useServiceFetch } from "@/composables";
import { computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
type KeysValues = keyof typeof initialValue;
const { menuToEdit: { id: menuIdToEdit, ...menuToEdit } = {} } = defineProps({
  menuToEdit: {
    type: Object as () => Menu,
    required: false,
  },
});

const valid = ref(false);
const initialValue: MenuForm = {
  name: "",
  ...menuToEdit,
};
const menu: MenuForm = ref({ ...initialValue }).value;

const { doFetch, loading } = useServiceFetch(
  menuService[menuIdToEdit !== undefined ? "update" : "create"]
);
const validateIfChangeExist = computed(() => {
  return isEqualObject(menu, initialValue);
});

const toast = useToast();

const router = useRouter();
//form vuetify validation rules to validate user form

const resetForm = () => {
  //Generate a new object with the same keys as initialValue
  const initial = { ...initialValue };
  valid.value = false;
  Object.keys(menu).forEach(
    (key) => (menu[key as KeysValues] = initial[key as KeysValues])
  );
};

const submitForm = async () => {
  if (!valid.value || !menu || !validateIfChangeExist.value) return;
  try {
    let payload: MenuForm | (Partial<MenuForm> & { id: number });
    let msgSuccess: string;
    if (menuIdToEdit !== undefined) {
      payload = getPayloadToEdit(menuIdToEdit as number, menu, {
        ...initialValue,
      });
      msgSuccess = "Menu updated successfully";
    } else {
      payload = menu;
      msgSuccess = "Menu created successfully";
    }
    await doFetch(payload as MenuForm);
    toast.success(msgSuccess);
    router.replace({ name: ROUTES_NAMES.MENUS });
    resetForm();
  } finally {
    // Reset form
  }
};
</script>
