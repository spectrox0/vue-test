import { UserForm } from "@/models";
import zod from "zod";

//form vuetify validation rules to validate user form

export const commonValidation = Object.freeze({
  required: (value: string) => !!value || "This field is required",
  name: (value: string) => {
    // Include validtion min 6 characters and max 30 characters
    if (value.length < 4 || value.length > 30) {
      return "the name must be between 4 and 30 characters.";
    }
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(value) || "Invalid name.";
  },
});
export const validationRules = (user: UserForm) =>
  Object.freeze({
    required: commonValidation.required,
    name: commonValidation.name,
    email: (value: string) => {
      const emailSchema = zod.string().email();
      try {
        emailSchema.parse(value);
        return true;
      } catch (error) {
        return "Invalid email.";
      }
    },
    username: (value: string) => {
      if (value.length < 4 || value.length > 30) {
        return "the username must be between 4 and 30 characters.";
      }
      // validate if the username contain valid characters recommended
      const pattern = /^[A-Za-z][A-Za-z0-9_]{4,29}$/;
      return pattern.test(value) || "Invalid username.";
    },
    password: (value: string) => {
      if (!value) return true;
      // Include validtion pasword min and max character recommended
      if (value.length < 6 || value.length > 50) {
        return "the password must be between 6 and 50 characters.";
      }

      //simple validate if the password contain valid characters
      const pattern = /^[A-Za-z0-9!@#$%^&/*()]+$/g;
      return pattern.test(value) || "Invalid password.";
    },
    confirmPassword: (value: string) => {
      return value === user.password || "Password does not match.";
    },
  });
