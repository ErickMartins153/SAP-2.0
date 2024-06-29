import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import useBottomSheet from "@/hooks/useBottom";

import { Easing } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

const animationConfig = {
  duration: 300,
  easing: Easing.out(Easing.quad),
};

const Bottom = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {
    isVisible,
    closeBottom,
    onSelectValue,
    bottomContent: modalContent,
  } = useBottomSheet();
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0, animationConfig);
    } else {
      bottomSheetRef.current?.close(animationConfig);
    }
  }, [isVisible]);

  const closeBackdropHandler = useCallback(() => {
    bottomSheetRef.current?.close(animationConfig);
    closeBottom();
  }, [closeBottom]);

  return (
    <BottomSheet
      keyboardBlurBehavior="restore"
      backgroundStyle={{ backgroundColor: Colors.background }}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      style={styles.bottomSheet}
      index={-1}
      backdropComponent={(props) =>
        renderBackdrop({ props, onClose: closeBackdropHandler })
      }
      enablePanDownToClose
      onClose={closeBottom}
    >
      {modalContent}
    </BottomSheet>
  );
};

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

export default memo(Bottom);
