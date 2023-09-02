import { AxiosError } from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
// Handle API errors and show toast message
export const handleAPIError = (
  error: unknown,
  defaultMsg = "An error occurred while processing your request"
) => {
  let message: string = "";
  if (error instanceof AxiosError && error.response?.data?.message) {
    message = error.response.data.message;
  } else {
    message = error instanceof Error ? error.message : defaultMsg;
  }
  toast.error(message);
  return message;
};
