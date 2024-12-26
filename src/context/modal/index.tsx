"use client";
import ModalWrapper from "@/components/organisms/Modal/ModalWrapper";
import React, { createContext, useContext, useState, FC } from "react";

type ModalContextType = {
  showModal: (content: React.ReactNode, style?: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [isShown, setIsShown] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [style, setStyle] = useState("h-[700px] w-[550px]");

  const showModal = (
    content: React.ReactNode,
    customStyle: string = "h-[700px] w-[550px]"
  ) => {
    setModalContent(content);
    setStyle(customStyle);
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
    setModalContent(null);
  };

  const contextValue = {
    showModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {isShown && (
        <ModalWrapper setModal={closeModal} isShown={isShown} style={style}>
          {modalContent}
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

// Custom hooks to use modal actions
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
