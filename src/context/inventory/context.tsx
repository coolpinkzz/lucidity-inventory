"use client";
import { InventoryType } from "@/type/inventory";
import { createContext, useContext } from "react";

export interface InventoryContext {
  inventory: InventoryType[] | undefined;
  updateInventory: (inventory: InventoryType) => void;
  addInventory: (inventory: InventoryType) => void;
  deleteInventory: (id: number) => void;
  disableProduct: (id: number) => void;
  totalProducts: number | null;
  totalStoreValue: number | null;
  outOfStocks: number | null;
  noOfCategory: number | null;
}

export const InventoryContext = createContext<InventoryContext>({
  inventory: undefined,
  updateInventory: () => undefined,
  addInventory: () => undefined,
  deleteInventory: () => undefined,
  totalProducts: null,
  totalStoreValue: null,
  outOfStocks: null,
  noOfCategory: null,
  disableProduct: () => undefined,
});

export const useInventory = () => useContext(InventoryContext);
