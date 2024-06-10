import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, View, type StyleProp, type TextStyle } from "react-native";

export type IconProps = {
  name: keyof typeof Feather.glyphMap;
  size?: number;
  color?: keyof typeof Colors;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  showBg?: boolean;
};

export default function Icon({
  name,
  size = 24,
  color,
  onPress,
  style,
  showBg = false,
}: IconProps) {
  return (
    <View style={[style, { overflow: "hidden" }]}>
      <Feather
        name={name}
        size={size}
        color={color ? Colors[color] : Colors["viridian"]}
        onPress={onPress}
        style={{ zIndex: 10 }}
      />
      {showBg && <View style={styles.iconBackground} />}
    </View>
  );
}

const styles = StyleSheet.create({
  iconBackground: {
    position: "absolute",
    backgroundColor: "black",
    height: 30,
    width: 30,
    marginTop: 4,
    marginBottom: 2,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    zIndex: 2,
  },
});
