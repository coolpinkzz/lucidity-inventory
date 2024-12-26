import { APIError, InventoryType } from "@/type/inventory";
import { triggerError } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getInventoryAPI(): Promise<InventoryType[]> {
  try {
    const response = await axios.get(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    return response.data;
  } catch (error) {
    triggerError("Server Error");
    console.error("An unexpected error occurred:", error);
    throw new Error("An unexpected error occurred.");
  }
}

export function useGetInventory(hasCheckedStorage?: boolean) {
  return useQuery<InventoryType[], APIError>({
    queryKey: ["getInventory"],
    queryFn: () => getInventoryAPI(),
    retry: 0,
    staleTime: 10 * (60 * 1000),
  });
}
