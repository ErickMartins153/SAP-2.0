import { useContext } from "react";
import { BottomSheetContext } from "@/context/modal";

export default function useBottomSheet() {
  return useContext(BottomSheetContext);
}
