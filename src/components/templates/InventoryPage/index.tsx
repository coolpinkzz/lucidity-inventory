import StatsWidgets from "@/components/molecules/StatsWidgets";
import ProductsTable from "@/components/organisms/ProductsTable";
import React from "react";

const InventoryPage = () => {
  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Inventory stats</h1>
        <StatsWidgets />
        <ProductsTable />
      </div>
    </div>
  );
};

export default InventoryPage;
