"use client";
import Inventroyskeleton from "@/components/atoms/Inventroyskeleton";
import { useInventory } from "@/context/inventory/context";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { RiExchangeDollarLine, RiShapesFill } from "react-icons/ri";

const StatsWidgets = () => {
  const { totalProducts, totalStoreValue, outOfStocks, noOfCategory } =
    useInventory();
  console.log(totalStoreValue);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-darkGreen rounded-lg p-6 transition-transform hover:shadow-slate-200 hover:shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-3xl">
            <FaShoppingCart />
          </div>
          <div>
            <p className="text-white text-sm">Total product</p>
            {totalProducts ? (
              <p className="text-4xl font-bold mt-2">{totalProducts}</p>
            ) : (
              <Inventroyskeleton />
            )}
          </div>
        </div>
      </div>
      <div className="bg-darkGreen rounded-lg p-6 transition-transform hover:shadow-slate-200 hover:shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-3xl">
            <RiExchangeDollarLine />
          </div>
          <div>
            <p className="text-white text-sm">Total store value</p>
            {totalStoreValue ? (
              <p className="text-4xl font-bold mt-2">{totalStoreValue}</p>
            ) : (
              <Inventroyskeleton />
            )}
          </div>
        </div>
      </div>
      <div className="bg-darkGreen rounded-lg p-6 transition-transform hover:shadow-slate-200 hover:shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-3xl">
            <MdRemoveShoppingCart />
          </div>
          <div>
            <p className="text-white text-sm">Out of stocks</p>
            {outOfStocks ? (
              <p className="text-4xl font-bold mt-2">{outOfStocks}</p>
            ) : (
              <Inventroyskeleton />
            )}
          </div>
        </div>
      </div>
      <div className="bg-darkGreen rounded-lg p-6 transition-transform hover:shadow-slate-200 hover:shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-3xl">
            <RiShapesFill />
          </div>
          <div>
            <p className="text-white text-sm">No of Category</p>
            {noOfCategory ? (
              <p className="text-4xl font-bold mt-2">{noOfCategory}</p>
            ) : (
              <Inventroyskeleton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidgets;
