import { toast } from "react-hot-toast";

export const triggerSuccess = (message: string) => {
  toast.success(message);
};

export const triggerError = (message: string) => {
  toast.error(message);
};
