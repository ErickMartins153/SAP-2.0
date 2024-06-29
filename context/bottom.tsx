import { ReactNode, createContext, useState } from "react";

interface BottomContextType {
  isVisible: boolean;
  openBottom: () => void;
  closeBottom: () => void;
  bottomContent?: ReactNode;
  changeBottomContent: (content: ReactNode) => void;
  selectedValue: undefined | string;
  onSelectValue: (value: string) => void;
  clear: () => void;
}

export const BottomSheetContext = createContext<BottomContextType>({
  isVisible: false,
  openBottom: () => {},
  closeBottom: () => {},
  changeBottomContent: (content: ReactNode) => {},
  selectedValue: undefined,
  onSelectValue: (value: string) => {},
  clear: () => {},
});

export default function BottomContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [bottomContent, setBottomContent] = useState<ReactNode>();

  function openBottom() {
    setIsVisible(true);
  }

  function closeBottom() {
    setIsVisible(false);
  }

  function onSelectValue(value: string) {
    closeBottom();
    setSelectedValue(value);
  }

  function changeBottomContent(content: ReactNode) {
    setBottomContent(content);
  }

  function clear() {
    setIsVisible(false);
    setSelectedValue(undefined);
    setBottomContent(null);
  }

  const value: BottomContextType = {
    isVisible,
    openBottom,
    closeBottom,
    bottomContent,
    changeBottomContent,
    selectedValue,
    onSelectValue,
    clear,
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
}
