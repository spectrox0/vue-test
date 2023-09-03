// Authentication Store with Pinia

import { CurrentUser } from "@/models/users";
import { defineStore } from "pinia";
import { authService } from "@/services";
import { KEYS_TO_PERSIST } from "@/utils/constants";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as CurrentUser | null,
  }),
  // Actions
  actions: {
    async login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) {
      const { token, user } =
        (await authService.login({ username, password })) ?? {};
      console.log(token, user);
      if (!token) throw new Error("Invalid token");
      localStorage.setItem(KEYS_TO_PERSIST.AUTH_TOKEN, token);
      this.user = { ...user, token };
      return this.user;
    },
    setUser(user: CurrentUser) {
      this.user = user;
    },
    logout() {
      localStorage.removeItem(KEYS_TO_PERSIST.AUTH_TOKEN);
      this.user = null;
    },
    async fetchUser(token: string) {
      const user = await authService.getCurrentUser(token);
      this.user = user;
    },
  },
});
