"use client";
import React from "react";
import { useAuth } from "@/context/auth/context";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { setAdmin } = useAuth();
  return (
    <div className="w-full bg-background sticky top-0 px-4 py-4">
      <div className="flex justify-end items-center">
        <label className="inline-flex items-center cursor-pointer px-4">
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 px-4">
            Admin
          </span>
          <input
            onChange={(e) => {
              setAdmin(!e.target.checked);
            }}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none   dark:peer-focus:text-neon rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neon"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            User
          </span>
        </label>
        <MdLogout />
      </div>
    </div>
  );
};

export default Navbar;
