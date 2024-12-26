"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { InventoryContext } from "./context";
import { InventoryType } from "@/type/inventory";
import { useGetInventory } from "@/services/inventory";

type InventoryProviderProps = {
  children: React.ReactNode;
};

const InventoryProvider: FC<InventoryProviderProps> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryType[]>();

  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [totalStoreValue, setTotalStoreValue] = useState<number | null>(null);
  const [outOfStocks, setOutOfStocks] = useState<number | null>(null);
  const [noOfCategory, setNoOfCategory] = useState<number | null>(null);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStocks: 0,
    noOfCategory: 0,
  });

  const { data: inventoryData } = useGetInventory();

  const recalculateStats = useCallback((inventory: InventoryType[]) => {
    const filterProducts = inventory.filter((item) => !item.isProductDisable);

    const storvalue = filterProducts.reduce((acc, item) => acc + item.value, 0);
    const outOfStocks = filterProducts.filter(
      (item) => item.quantity <= 0
    ).length;
    const uniqueCategories = new Set(
      filterProducts.map((item) => item.category)
    );

    setStats({
      totalProducts: inventory.length,
      totalStoreValue: storvalue,
      outOfStocks,
      noOfCategory: uniqueCategories.size,
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      if (inventoryData) {
        const formattedData = inventoryData?.map((item, index) => {
          return {
            ...item,
            price: Number(item.price.toString().slice(1)),
            value: item.quantity * Number(item.price.toString().slice(1)),
            id: index + 1,
            isProductDisable: false,
          };
        });
        setInventory(formattedData);
        recalculateStats(formattedData);
      } else {
        setInventory([]);
      }
    };
    init();
  }, [inventoryData, recalculateStats]);

  const updateInventory = useCallback(
    (payload: InventoryType) => {
      const { id } = payload;
      setInventory((prevInventory) => {
        const updatedInventory =
          prevInventory?.map((item) =>
            item.id === id ? { ...item, ...payload } : item
          ) || [];

        recalculateStats(updatedInventory);

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
        const updatedInventory =
          prevInventory?.filter((item: InventoryType) => item.id !== id) || [];

        recalculateStats(updatedInventory);
        // Update the stats state

        return updatedInventory;
      });
    },
    [inventory]
  );

  const disableProduct = useCallback(
    (id: number) => {
      setInventory((prevInventory) => {
        const updatedInventory =
          prevInventory?.map((item: InventoryType) => {
            if (item.id === id) {
              return { ...item, isProductDisable: !item.isProductDisable };
            }
            return item;
          }) || [];
        recalculateStats(updatedInventory);
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
      totalProducts: stats.totalProducts,
      totalStoreValue: stats.totalStoreValue,
      outOfStocks: stats.outOfStocks,
      noOfCategory: stats.noOfCategory,
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
