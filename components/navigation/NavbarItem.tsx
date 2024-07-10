import { DrawerItem } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import Icon from "../general/Icon";
import { Colors } from "@/constants/Colors";

type NavBarItemProps = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  size?: number;
  onPress: (page: string) => void;
  page: string;
};

export default function NavbarItem({
  icon,
  label,
  onPress,
  page,
  size = 42,
}: NavBarItemProps) {
  return (
    <DrawerItem
      label={label}
      labelStyle={{ fontSize: 18, color: Colors.text }}
      icon={() => (
        <Icon
          name={icon}
          color="icon"
          size={size}
          onPress={() => onPress(page)}
        />
      )}
      onPress={() => onPress(page)}
    />
  );
}
