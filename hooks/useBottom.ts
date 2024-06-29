import { useContext } from "react";
import { BottomSheetContext } from "@/context/bottom";

export default function useBottomSheet() {
  return useContext(BottomSheetContext);
}
