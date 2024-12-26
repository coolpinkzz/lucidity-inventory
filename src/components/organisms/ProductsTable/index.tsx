import { TABLE_HEADER } from "@/constant/inventory-table-header";
import { useInventory } from "@/context/inventory/context";
import { InventoryType } from "@/type/inventory";
import React from "react";
import { openModal } from "../Modal/ModalManager";
import EditProductForm from "../EditProductForm/EditProductForm";
import { useAuth } from "@/context/auth/context";
import { triggerSuccess } from "@/utils/toast";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import TableSkeleton from "@/components/atoms/TableSkeletion";

const ProductsTable = () => {
  const { inventory, deleteInventory, disableProduct } = useInventory();
  const { isAdmin } = useAuth();
  const handleEditIcon = (item: InventoryType, isProductDisable: boolean) => {
    if (isAdmin && !isProductDisable) {
      openModal(
        <EditProductForm productDetail={item} />,
        "h-[400px] w-[600px]" // Custom styles
      );
    }
  };

  const handleDeleteIcon = (id: number) => {
    if (isAdmin) {
      deleteInventory(id);
      triggerSuccess("Product deleted sucessfully!");
    }
  };

  const handleDisableProduct = (id: number) => {
    if (isAdmin) {
      console.log("disbale");
      disableProduct(id);
    }
  };

  if (!inventory) return <TableSkeleton />;

  return (
    <div className="bg-[#212123] rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            {TABLE_HEADER?.map((item) => {
              return (
                <th
                  key={item.id}
                  className="px-6 py-3 text-left text-xs font-bold text-neon"
                >
                  <p className="bg-[#161818] w-fit p-2 rounded-md">
                    {item.label}
                  </p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {inventory?.map((item) => (
            <tr
              key={item.name}
              className="hover:bg-gray-700/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleEditIcon(item, !!item.isProductDisable)
                    }
                    className={`${
                      isAdmin && !item.isProductDisable
                        ? "text-green"
                        : "text-gray-400"
                    }`}
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDisableProduct(item.id)}
                    className={`${
                      isAdmin && !item.isProductDisable
                        ? "text-purple"
                        : "text-gray-400"
                    }`}
                  >
                    {item.isProductDisable ? <IoMdEyeOff /> : <IoMdEye />}
                  </button>
                  <button
                    onClick={() => handleDeleteIcon(item.id)}
                    className={`${isAdmin ? "text-red" : "text-gray-400"}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
