import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import useBottomSheet from "@/hooks/useModal";

import { Easing } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

const animationConfig = {
  duration: 300,
  easing: Easing.out(Easing.quad),
};

export default function Bottom() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isVisible, closeModal, onSelectValue, modalContent } =
    useBottomSheet();
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0, animationConfig);
    } else {
      bottomSheetRef.current?.close(animationConfig);
    }
  }, [isVisible]);

  function onSelectHandler(value: string) {
    onSelectValue(value);
    bottomSheetRef.current?.close(animationConfig);
  }

  const closeBackdropHandler = useCallback(() => {
    bottomSheetRef.current?.close(animationConfig);
    closeModal();
  }, [closeModal]);

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: Colors.background }}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      style={styles.bottomSheet}
      index={-1}
      backdropComponent={(props) =>
        renderBackdrop({ props, onClose: closeBackdropHandler })
      }
      enablePanDownToClose
      onClose={closeModal}
    >
      {modalContent}
    </BottomSheet>
  );
}

function renderBackdrop({
  props,
  onClose,
}: {
  props: BottomSheetBackdropProps;
  onClose: () => void;
}) {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} onPress={onClose} />
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    marginHorizontal: "2%",
    paddingHorizontal: "2%",
  },
  content: {
    gap: 12,
    marginTop: "2%",
    paddingBottom: "4%",
    borderBottomWidth: 1,
  },
  items: {
    marginVertical: "12%",
    gap: 12,
  },
});
