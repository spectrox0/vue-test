// Utilities
import { defineStore } from "pinia";

// We define the store name here so it's easier to reference
// Authentication , User , etc.
export const useStore = defineStore("app", {
  state: () => ({
    //
    authToken: undefined,
    currentUser: undefined,
  }),
  
});
