"use client";
import InputText from "@/components/atoms/InputText";
import { InventoryType } from "@/type/inventory";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInventory } from "@/context/inventory/context";
import { triggerSuccess } from "@/utils/toast";
import { useModal } from "@/context/modal";

interface Props {
  productDetail: InventoryType;
}

const EditProductForm = ({ productDetail }: Props) => {
  const { id, name, category, price, quantity, value } = productDetail;
  const { updateInventory } = useInventory();
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      category: category || "",
      price: price || 0,
      quantity: quantity || 0,
      value: quantity * price || 0,
    },
  });

  const watchedPrice = watch("price");
  const watchedQuantity = watch("quantity");

  useEffect(() => {
    const calculatedValue = watchedPrice * watchedQuantity;
    setValue("value", calculatedValue, { shouldValidate: true });
  }, [watchedPrice, watchedQuantity, setValue]);

  const onSubmit = (data: any) => {
    updateInventory({ id, ...data });
    closeModal();
    triggerSuccess("Product updated Sucessfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <p className="text-lg my-2">{name}</p>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <InputText
            error={errors.category?.message}
            type="text"
            {...register("category", { required: "This field is required" })}
            label="Category"
            name="category"
          />
          <InputText
            error={errors.price?.message}
            type="text"
            {...register("price", {
              required: "This field is required",
              validate: (value) => value > 0 || "Price must be greater than 0",
            })}
            label="Price ($)"
            name="price"
          />
        </div>
        <div className="flex gap-4">
          <InputText
            error={errors.quantity?.message}
            type="text"
            {...register("quantity", {
              required: "This field is required",
              validate: (value) => value >= 0 || "Quantity cannot be negative",
            })}
            label="Quantity"
            name="quantity"
          />
          <InputText
            error={errors.value?.message}
            type="text"
            {...register("value", { required: "This field is required" })}
            label="Value"
            name="value"
            disabled
          />
        </div>
        <div className="form-actions absolute right-8 bottom-8 flex gap-4">
          <button
            className="text-neon px-3 py-2"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`px-3 py-2 rounded-md ${
              !isDirty ? "bg-[#434441]" : "bg-neon text-neutral-800"
            } `}
            type="submit"
            disabled={!isDirty}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
