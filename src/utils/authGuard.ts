import { useUserStore } from "@/store";
import type { NavigationGuard } from "vue-router";
import { KEYS_TO_PERSIST } from "./constants";
import { handleAPIError } from "./handleApiError";

export const authGuard: NavigationGuard = async (_to, _from, next) => {
  const userStore = useUserStore();

  // Fetch user data from the server or local storage
  if (userStore.user) return next();
  const authToken = localStorage.getItem(KEYS_TO_PERSIST.AUTH_TOKEN);
  if (!authToken) return next({ name: "Login" });
  await userStore.fetchUser(authToken).catch(handleAPIError);
  return next(!userStore.user ? { name: "Login" } : {});
};
