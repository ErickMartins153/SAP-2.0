import { ReactNode, createContext, useState } from "react";

interface ModalContextType {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedValue: undefined | string;
  onSelectValue: (value: string) => void;
  clear: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isVisible: false,
  openModal: () => {},
  closeModal: () => {},
  selectedValue: undefined,
  onSelectValue: (value: string) => {},
  clear: () => {},
});

export default function ModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();

  function openModal() {
    setIsVisible(true);
  }

  function closeModal() {
    setIsVisible(false);
  }

  function onSelectValue(value: string) {
    setSelectedValue(value);
  }

  function clear() {
    setIsVisible(false);
    setSelectedValue(undefined);
  }

  const value: ModalContextType = {
    isVisible,
    openModal,
    closeModal,
    selectedValue,
    onSelectValue,
    clear,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
