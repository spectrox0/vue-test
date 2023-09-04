<!-- components/UserForm.vue -->

<template>
  <v-form class="form" ref="form" v-model="valid">
    <v-text-field
      v-model="user.name"
      label="Name"
      :disabled="loading"
      :rules="[rules.required, rules.name]"
    ></v-text-field>
    <v-text-field
      v-model="user.lastname"
      label="Lastname"
      :disabled="loading"
      :rules="[rules.required, rules.name]"
    ></v-text-field>
    <v-text-field
      v-model="user.email"
      label="Email"
      type="email"
      prepend-inner-icon="mdi-email"
      :disabled="loading"
      :rules="[rules.required, rules.email]"
    ></v-text-field>
    <v-text-field
      v-model="user.username"
      label="Username"
      :disabled="loading"
      :rules="[rules.required, rules.username]"
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showPassword = !showPassword"
      :disabled="loading"
      :rules="[userToEdit ? [] : rules.required, rules.password].flat()"
    ></v-text-field>
    <v-text-field
      v-model="user.confirmPassword"
      label="Confirm Password"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showPassword = !showPassword"
      :disabled="loading"
      :rules="[userToEdit ? [] : rules.required, rules.confirmPassword].flat()"
    >
    </v-text-field>
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
import { ref } from "vue";
import { User, UserForm } from "@/models";
import { useServiceFetch } from "@/composables";
import { userService } from "@/services";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { validationRules } from "@/utils/validation";
import { computed } from "vue";
import { ROUTES_NAMES, getPayloadToEdit, isEqualObject } from "@/utils";

type KeysValues = keyof typeof initialValue;
const { userToEdit: { id: userIdToEdit, ...userToEdit } = {} } = defineProps({
  userToEdit: {
    type: Object as () => User,
    required: false,
  },
});
const showPassword = ref(false);
const valid = ref(false);
const initialValue = {
  name: "",
  email: "",
  lastname: "",
  username: "",
  password: "",
  confirmPassword: "",
  ...userToEdit,
};
const user: UserForm = ref({ ...initialValue }).value;

const { doFetch, loading } = useServiceFetch(
  userService[userIdToEdit !== undefined ? "update" : "create"]
);
const router = useRouter();
const toast = useToast();

const validateIfChangeExist = computed(() => {
  return isEqualObject(user, initialValue);
});
//form vuetify validation rules to validate user form

const resetForm = () => {
  //Generate a new object with the same keys as initialValue
  const initial = { ...initialValue };
  valid.value = false;
  Object.keys(user).forEach(
    (key) => (user[key as KeysValues] = initial[key as KeysValues])
  );
};

const submitForm = async () => {
  if (!valid.value || !user || !validateIfChangeExist.value) return;
  try {
    let payload: UserForm | (Partial<UserForm> & { id: number });
    let msgSuccess: string;
    if (userIdToEdit !== undefined) {
      payload = getPayloadToEdit(userIdToEdit as number, user, {
        ...initialValue,
      });
      msgSuccess = "User updated successfully";
    } else {
      payload = user;
      msgSuccess = "User created successfully";
    }
    await doFetch(payload as UserForm);
    toast.success(msgSuccess);
    router.replace({ name: ROUTES_NAMES.USERS });
    resetForm();
  } finally {
    // Reset form
  }
};

const rules = computed(() => validationRules(user));
</script>
