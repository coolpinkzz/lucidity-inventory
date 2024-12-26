export interface InventoryType {
  id: number;
  name: string;
  category: string;
  value: number;
  quantity: number;
  price: number;
  isProductDisable?: boolean;
}
// Define the type for the error response
export interface APIError {
  message: string;
  status: number;
}
