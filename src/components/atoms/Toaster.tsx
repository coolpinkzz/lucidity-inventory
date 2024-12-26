import React from "react";
import { Toaster as ToastNotification } from "react-hot-toast";

export const Toaster = () => {
  return (
    <ToastNotification
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
};

export default Toaster;
