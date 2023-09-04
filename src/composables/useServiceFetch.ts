import { ref, shallowRef } from "vue";
import { useUserStore } from "@/store";
import { menuService, userService } from "@/services";
import { handleAPIError } from "@/utils";
import { Pop } from "types/generic";

//composable to fetch data from the server and handle loading and error states
export const useServiceFetch = <T extends (...payload: any[]) => Promise<any>>(
  // request from a service
  request: T
) => {
  type Payload = Parameters<T>;
  type Response = Awaited<ReturnType<T>>;

  const data = shallowRef<Response>();
  const error = ref<string>();
  const loading = ref<boolean>(false);
  const { user } = useUserStore();

  //   const { signal, abort } = new AbortController();

  // payload to pass to the request
  const doFetch = async (...payload: Pop<Payload>): Promise<Response> => {
    loading.value = true;
    try {
      // Request data from the server and set the data and error state
      // pass the authentication token from the user store to the request in case it's needed
      const res = await request(...payload, user?.token);
      data.value = res;
      error.value = undefined;
      return res;
    } catch (err) {
      error.value = handleAPIError(err);
      throw new Error(error.value);
    } finally {
      loading.value = false;
    }
  };
  return { data, error, loading, doFetch, authToken: user?.token };
};

export const useFetchMenus = () => useServiceFetch(menuService.getAll);

export const useFetchUsers = () => useServiceFetch(userService.getAll);

export const fetchAllComposables = Object.freeze({
  menus: useFetchMenus,
  users: useFetchUsers,
} as const);
