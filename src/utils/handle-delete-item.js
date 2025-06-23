import { notify } from "@/utils/toastify";
const noop = () => {};

export const handleDeleteItem = async (
  callback,
  onSuccess = noop,
  onFailure = noop
) => {
  try {
    const result = await callback();

    if (result.status === "success") {
      notify(result.message, "success");
      onSuccess();
    } else {
      notify(result.error.message, "info");
      onFailure();
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    onFailure();
    notify(error.message, "error");
  }
};
