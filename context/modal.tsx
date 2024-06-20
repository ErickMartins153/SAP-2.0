import { ReactNode, createContext, useState } from "react";

interface ModalContextType {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalContent?: ReactNode;
  changeModalContent: (content: ReactNode) => void;
  selectedValue: undefined | string;
  onSelectValue: (value: string) => void;
  clear: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isVisible: false,
  openModal: () => {},
  closeModal: () => {},
  changeModalContent: (content: ReactNode) => {},
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
  const [modalContent, setModalContent] = useState<ReactNode>();

  function openModal() {
    setIsVisible(true);
  }

  function closeModal() {
    setIsVisible(false);
  }

  function onSelectValue(value: string) {
    closeModal();
    setSelectedValue(value);
  }

  function changeModalContent(content: ReactNode) {
    setModalContent(content);
  }

  function clear() {
    setIsVisible(false);
    setSelectedValue(undefined);
  }

  const value: ModalContextType = {
    isVisible,
    openModal,
    closeModal,
    modalContent,
    changeModalContent,
    selectedValue,
    onSelectValue,
    clear,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
