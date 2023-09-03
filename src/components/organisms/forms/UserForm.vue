<!-- components/UserForm.vue -->

<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="user.name"
      label="Nombre"
      :rules="[rules.required, rules.name]"
    ></v-text-field>
    <v-text-field
      v-model="user.lastname"
      label="Apellido"
      :rules="[rules.required, rules.name]"
    ></v-text-field>
    <v-text-field
      v-model="user.email"
      label="Correo Electrónico"
      :rules="[rules.required, rules.email]"
    ></v-text-field>
    <v-text-field
      v-model="user.username"
      label="Username"
      :rules="[rules.required, rules.username]"
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      label="Password"
      type="password"
      :rules="[rules.required, rules.password]"
    ></v-text-field>
    <v-text-field
        v-model="user.confirmPassword"
        label="Confirmar Contraseña"
        type="password"
        :rules="[rules.required, rules.confirmPassword]">
    </v-text-field>
    <v-btn @click="submitForm" :disabled="!valid">Crear Usuario</v-btn>
  </v-form>
</template>

<script lang="ts" >
import { defineComponent, ref } from "vue";
import { UserForm } from "@/models";
import {useServiceFetch} from '@/composables'
import { userService} from '@/services'
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "UserForm",
  setup() {
    const valid = ref(false);
    const user: UserForm = ref({
      id: 0,
      name: "",
      email: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
    }).value;

    const {doFetch} = useServiceFetch(userService.create, user)
  const router = useRouter()
  const toast = useToast() 
        //form vuetify validation rules to validate user form
        const rules = {
          required: (value: string) => !!value || "This field is required",
          name: (value: string) => {
            // Include validtion min 6 characters and max 30 characters
            if (value.length < 6 || value.length > 30) {
              return "the name must be between 6 and 30 characters.";
            }
            const pattern = /^[a-zA-Z]+$/;
            return pattern.test(value) || "Invalid name.";
          },
          email: (value: string) => {

            // Include validtion min 6 characters and max 30 characters
            if (value.length < 6 || value.length > 30) {
              return "the email must be between 6 and 30 characters.";
            }
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(value) || "Invalid e-mail.";
          },
          username: (value: string) => {
            if(value.length < 4 || value.length > 30) {
              return "the username must be between 4 and 30 characters.";
            }
            const pattern = /^[a-zA-Z0-9]+$/;
            return pattern.test(value) || "Invalid username.";
          },
          password: (value: string) => {
            if(value.length < 6 || value.length > 30) {
              return "the password must be between 6 and 30 characters.";
            }
            const pattern = /^[a-zA-Z0-9]+$/;
            return pattern.test(value) || "Invalid password.";
          },
          confirmPassword: (value: string) => {
            return value === user.password || "Password does not match.";
          },
          

    }

     const submitForm = async () => {
 if(!valid.value || !user) return 
  try { 
      await doFetch()
      toast.success("User created successfully")
      } finally {
// Reset form
      valid.value = false
      user.name = ""
      user.lastname = ""
      user.email = ""
      user.username = ""
      user.password = ""
      user.confirmPassword = ""
      router.replace("/users")
    }
  }

    return {
      valid,
      user,
      rules,
      submitForm,
    };
  },
});