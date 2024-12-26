"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { InventoryContext } from "./context";
import { InventoryType } from "@/type/inventory";
import { useGetInventory } from "@/services/inventory";
import { DUMMY_DATA } from "@/constant/sample-data";

type InventoryProviderProps = {
  children: React.ReactNode;
};

const InventoryProvider: FC<InventoryProviderProps> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryType[]>();
  const [hasCheckedStorage, setHasCheckedStorage] = useState<boolean>(false);

  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [totalStoreValue, setTotalStoreValue] = useState<number | null>(null);
  const [outOfStocks, setOutOfStocks] = useState<number | null>(null);
  const [noOfCategory, setNoOfCategory] = useState<number | null>(null);
  const { data: inventoryData, error } = useGetInventory();

  const recalculateStats = (inventory: InventoryType[]) => {
    let storvalue = 0;
    let outOfStocks = 0;
    let category: string[] = [];

    const filterProducts = inventory.filter((item) => !item.isProductDisable);

    filterProducts.forEach((item) => {
      storvalue += Number(item.value) * item.quantity;
      if (item.quantity <= 0) {
        outOfStocks += 1;
      }
      category.push(item.category);
    });

    return {
      totalProducts: inventory.length,
      totalStoreValue: storvalue,
      outOfStocks,
      noOfCategory: [...new Set(category)].length,
    };
  };

  useEffect(() => {
    const init = async () => {
      if (inventoryData) {
        console.log(inventoryData, "inventoryData");
        const inventoryList = inventoryData?.map((item, index) => {
          return {
            ...item,
            price: Number(item.price.toString().slice(1)),
            value: item.quantity * Number(item.price.toString().slice(1)),
            id: index + 1,
            isProductDisable: false,
          };
        });
        setInventory(inventoryList);
        const updatedStats = recalculateStats(inventoryList);
        setTotalProducts(updatedStats.totalProducts);
        setTotalStoreValue(updatedStats.totalStoreValue);
        setOutOfStocks(updatedStats.outOfStocks);
        setNoOfCategory(updatedStats.noOfCategory);
      } else {
        setInventory([]);
      }
      setHasCheckedStorage(true);
    };
    init();
  }, [hasCheckedStorage, inventoryData]);

  const updateInventory = useCallback(
    (payload: InventoryType) => {
      const { id } = payload;
      setInventory((prevInventory) => {
        const updatedInventory = prevInventory?.map((item) =>
          item.id === id ? { ...item, ...payload } : item
        );

        // Recalculate the stats after the update
        const updatedStats = recalculateStats(
          updatedInventory as InventoryType[]
        );
        setTotalProducts(updatedStats.totalProducts);
        setTotalStoreValue(updatedStats.totalStoreValue);
        setOutOfStocks(updatedStats.outOfStocks);
        setNoOfCategory(updatedStats.noOfCategory);

        return updatedInventory;
      });
    },
    [inventory]
  );

  const addInventory = (payload: InventoryType) => {
    if (inventory) {
      setInventory([...inventory, payload]);
    }
  };

  const deleteInventory = useCallback(
    (id: number) => {
      setInventory((prevInventory) => {
        const updatedInventory = prevInventory?.filter(
          (item: InventoryType) => item.id !== id
        );

        // Use the helper function to recalculate the stats
        const updatedStats = recalculateStats(
          updatedInventory as InventoryType[]
        );

        // Update the stats state
        setTotalProducts(updatedStats.totalProducts);
        setTotalStoreValue(updatedStats.totalStoreValue);
        setOutOfStocks(updatedStats.outOfStocks);
        setNoOfCategory(updatedStats.noOfCategory);

        return updatedInventory;
      });
    },
    [inventory]
  );

  const disableProduct = useCallback(
    (id: number) => {
      setInventory((prevInventory) => {
        const updatedInventory = prevInventory?.map((item: InventoryType) => {
          if (item.id === id) {
            return { ...item, isProductDisable: !item.isProductDisable };
          }
          return item;
        });
        // Use the helper function to recalculate the stats
        const updatedStats = recalculateStats(
          updatedInventory as InventoryType[]
        );

        // Update the stats state
        setTotalProducts(updatedStats.totalProducts);
        setTotalStoreValue(updatedStats.totalStoreValue);
        setOutOfStocks(updatedStats.outOfStocks);
        setNoOfCategory(updatedStats.noOfCategory);
        return updatedInventory;
      });
    },
    [inventory]
  );

  const context = useMemo(() => {
    return {
      inventory,
      updateInventory,
      addInventory,
      deleteInventory,
      totalProducts,
      totalStoreValue,
      outOfStocks,
      noOfCategory,
      disableProduct,
    } satisfies InventoryContext;
  }, [inventory, updateInventory, addInventory, deleteInventory]);

  return (
    <InventoryContext.Provider value={context}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
