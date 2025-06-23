import { notify } from "@/utils/toastify";
const noop = () => {};

export const handleSubmitItem = async (
  callback,
  onSuccess = noop,
  onFailure = noop
) => {
  try {
    const result = await callback();

    if (result.status === "success") {
      notify(result.message, "success");
      onSuccess();
      return true;
    } else {
      notify(result.error.message, "info");
      onFailure();
    }
    return false;
  } catch (error) {
    console.log("Error Submiting item:", error);
    notify(error.message, "error");
    onFailure();
    return false;
  }
};
