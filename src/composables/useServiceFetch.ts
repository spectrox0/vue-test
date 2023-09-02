import { ref, shallowRef } from "vue";
import { useUserStore } from "@/store";
import { menuService } from "@/services/menu";
import { userService } from "@/services/user";
import { handleAPIError } from "@/utils";

//composable to fetch data from the server and handle loading and error states
export const useServiceFetch = <T extends {}>(
  // request from a service
  request: (...rest: any[]) => Promise<T>,
  // payload to pass to the request
  ...payload: Parameters<typeof request>
) => {
  const data = shallowRef<T>();
  const error = ref<string>();
  const loading = ref<boolean>(false);
  const store = useUserStore();

  //   const { signal, abort } = new AbortController();

  const doFetch = async () => {
    loading.value = true;
    try {
      // Request data from the server and set the data and error state
      // pass the authentication token from the user store to the request in case it's needed
      const res = await request(...payload, store.user?.token);
      data.value = res;
      error.value = undefined;
    } catch (err) {
      error.value = handleAPIError(err);
    } finally {
      loading.value = false;
    }
  };
  return { data, error, loading, doFetch, authToken: store.user?.token };
};

export const useFetchMenus = () => useServiceFetch(menuService.getAll);
export const useFetchUsers = () => useServiceFetch(userService.getAll);
