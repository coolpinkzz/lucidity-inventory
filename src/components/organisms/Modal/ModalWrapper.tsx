"use client";
import React from "react";
import { IoClose } from "react-icons/io5";

type ModalWrapperProps = {
  children: React.ReactNode;
  setModal: (value: boolean) => void;
  isShown: boolean;
  style?: string;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  setModal,
  isShown,
  style = "",
}) => {
  if (!isShown) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        onClick={() => setModal(false)}
        className="fixed inset-0 bg-black opacity-70 -z-10"
      ></div>

      <div
        className={`relative bg-[#2A2B27] ${style} max-sm:w-11/12 max-md:w-2/3 max-h-[85%] overflow-y-auto rounded-2xl shadow-lg p-8 lg:p-8`}
      >
        <button
          onClick={() => setModal(false)}
          className="absolute right-2 top-2 p-2"
        >
          <IoClose size={24} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
