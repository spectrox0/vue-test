!-- Login View in Vueitfy with vue 3-->
<template>
  <v-app
    ><v-main
      ><v-container class="login">
        <v-card class="login__container">
          <v-card-title class="login__title">Login</v-card-title>
          <v-form
            class="d-flex flex-column login__form"
            v-model="valid"
            @submit.prevent="handleLogin"
          >
            <v-text-field
              :disabled="loading"
              type="text"
              placeholder="Username"
              :rules="[rules.required]"
              v-model="user.username"
            />

            <v-text-field
              v-model="user.password"
              placeholder="Password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              :disabled="loading"
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn
              density="default"
              color="primary"
              variant="outlined"
              :disabled="!valid"
              size="large"
              :loading="loading"
              type="submit"
              >Login</v-btn
            >
          </v-form>
        </v-card>
      </v-container></v-main
    ></v-app
  >
</template>
<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .login__container {
    width: 400px;
    padding: 20px;
    border-radius: 5px;
    .login__title {
      text-align: center;
      margin-bottom: 20px;
    }
    .login__form {
      display: flex;
      gap: 1rem;
    }
    .login__register {
      margin-top: 10px;
      text-align: center;
      a {
        color: #2e86de;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/store";
import { ROUTES_NAMES, handleAPIError } from "@/utils";
import { useRouter } from "vue-router";
import { commonValidation as rules } from "@/utils/validation";
//Login with username and password in vue 3
const { login } = useUserStore();
const toast = useToast();

// username and password state with ref
const loading = ref<boolean>(false);
const showPassword = ref(false);
const valid = ref(false);

const initialValue = {
  username: "",
  password: "",
};
const user = ref({ ...initialValue }).value;

const router = useRouter();
const handleLogin = async () => {
  try {
    //Set loading to true
    loading.value = true;
    //Validate username and password
    if (!user.username.trim() || !user.password.trim()) {
      toast.error("Username and password are required, can not be empty");
      return;
    }

    await login(user);
    toast.success("Login successfully");
    router.replace({ name: ROUTES_NAMES.HOME });
  } catch (error) {
    handleAPIError(error);
  } finally {
    //Set loading to false
    loading.value = false;
  }
};
</script>
