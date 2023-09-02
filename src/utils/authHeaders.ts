import { KEYS_TO_PERSIST } from "./constants";

export const getAuthHeaders = (token?: string) => {
  return {
    headers: {
      Authorization: `Bearer ${
        token || localStorage.getItem(KEYS_TO_PERSIST.AUTH_TOKEN)
      }`,
    },
  };
};
