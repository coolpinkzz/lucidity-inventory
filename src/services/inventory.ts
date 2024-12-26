import { APIError, InventoryType } from "@/type/inventory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function getInventoryAPI(): Promise<InventoryType[]> {
  const response = await axios.get(
    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
  );
  return response.data;
}

export function useGetInventory(hasCheckedStorage?: boolean) {
  return useQuery<InventoryType[], APIError>({
    queryKey: ["getInventory"],
    queryFn: () => getInventoryAPI(),
    retry: 0,
    staleTime: 10 * (60 * 1000),
  });
}
