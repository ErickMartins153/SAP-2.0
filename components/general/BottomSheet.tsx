import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import StyledText from "./StyledText";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

type ModalProps = {
  isVisible: boolean;
};

export default function Modal({ isVisible }: ModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["10%", "50%"]}
      style={styles.bottomSheet}
      index={-1}
      backdropComponent={(props) => renderBackdrop(props)}
    >
      <BottomSheetView>
        <StyledText>ma hoi</StyledText>
      </BottomSheetView>
    </BottomSheet>
  );
}

function renderBackdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} />;
}

const styles = StyleSheet.create({
  bottomSheet: {
    marginHorizontal: "2%",
    padding: "2%",
  },
});
