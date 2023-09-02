!-- Login View in Vueitfy with vue 3-->
<template>
  <v-app
    ><v-main
      ><v-container class="login">
        <v-card class="login__container">
          <v-card-title class="login__title">Login</v-card-title>
          <form
            class="d-flex flex-column login__form"
            @submit.prevent="handleLogin"
          >
            <v-text-field
              density="compact"
              variant="outlined"
              :disabled="loading"
              type="text"
              placeholder="Username"
              v-model="username"
            />
            <v-text-field
              variant="outlined"
              density="compact"
              :disabled="loading"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <v-btn
              density="default"
              color="primary"
              variant="outlined"
              :loading="loading"
              type="submit"
              >Login</v-btn
            >
          </form>
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

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/store";
import { handleAPIError } from "@/utils";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  //Login with username and password in vue 3
  setup() {
    const { login } = useUserStore();
    const toast = useToast();

    // username and password state with ref
    const username = ref<string>("");
    const password = ref<string>("");
    const loading = ref<boolean>(false);

    const router = useRouter();
    const handleLogin = async () => {
      try {
        //Set loading to true
        loading.value = true;
        //Validate username and password
        if (!username.value.trim() || !password.value.trim()) {
          toast.error("Username and password are required, can not be empty");
          return;
        }

        await login({
          username: username.value,
          password: password.value,
        });
        toast.success("Login successfully");
        router.replace("/");
      } catch (error) {
        handleAPIError(error);
      } finally {
        //Set loading to false
        loading.value = false;
      }
    };
    return {
      login,
      username,
      password,
      loading,
      handleLogin,
    };
  },
});
</script>
