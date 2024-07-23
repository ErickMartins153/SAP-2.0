import { PropsWithoutRef, forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import SelectDropdown, {
  type SelectDropdownProps,
} from "react-native-select-dropdown";
import StyledText from "../UI/StyledText";
import Icon from "../general/Icon";
import { Colors } from "@/constants/Colors";

type DataItem = {
  [key: string]: any;
  id?: string;
  nome?: string;
  tema?: string;
  sobrenome?: string;
};

type SelectProps = {
  data: DataItem[];
  placeholder: string;
  iconPress?: () => void;
} & Omit<PropsWithoutRef<SelectDropdownProps>, "renderButton" | "renderItem">;

function getDisplayText(item: DataItem | null, placeholder: string): string {
  if (!item) return placeholder;
  if (item.tema) return item.tema;
  if (item.nome)
    return item.sobrenome ? `${item.nome} ${item.sobrenome}` : item.nome;
  return placeholder;
}

const Select = forwardRef<SelectDropdown, SelectProps>(
  ({ placeholder, onSelect: onSelection, iconPress, ...props }, ref) => {
    return (
      <SelectDropdown
        ref={ref}
        key={placeholder}
        searchInputStyle={styles.dropdownSearchInputStyle}
        searchInputTxtColor={Colors.text}
        searchPlaceHolder={placeholder}
        searchPlaceHolderColor={Colors.placeholder}
        renderSearchInputLeftIcon={() => {
          return <Icon name="search" />;
        }}
        onSelect={(item: DataItem, index) => {
          if (item.nome && item.nome.toLowerCase() === "sim") {
            return onSelection(true, index);
          } else if (item.nome && item.nome.toLowerCase() === "não") {
            return onSelection(false, index);
          } else if (item.id) {
            return onSelection(item.id, index);
          } else if (item.uid) {
            return onSelection(item.uid, index);
          } else if (item.tema) {
            return onSelection(item.tema, index);
          } else {
            return onSelection(item.nome, index);
          }
        }}
        {...props}
        renderButton={(selectedItem: DataItem, isOpened: boolean) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )}
              <StyledText style={styles.dropdownButtonTxtStyle}>
                {getDisplayText(selectedItem, placeholder)}
              </StyledText>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                onPress={iconPress}
              />
            </View>
          );
        }}
        renderItem={(item: DataItem, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: Colors.button }),
              }}
              key={item.id || item.uid}
            >
              <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
              <StyledText
                style={[
                  styles.dropdownItemTxtStyle,
                  isSelected && { color: Colors.white },
                ]}
              >
                {getDisplayText(item, placeholder)}
              </StyledText>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    );
  }
);

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    padding: "4%",
    borderWidth: 1,
    elevation: 4,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: "bold",
    color: Colors.text,
    textTransform: "capitalize",
  },

  dropdownButtonIconStyle: {
    marginRight: "2%",
  },
  dropdownMenuStyle: {
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  dropdownSearchInputStyle: {
    backgroundColor: Colors.background,
    borderBottomColor: "#B1BDC8",
  },
  dropdownItemStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4%",
    borderWidth: 1,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontWeight: "bold",
    color: Colors.text,
    textTransform: "capitalize",
  },
  dropdownItemIconStyle: {
    marginRight: "2%",
  },
});

export default Select;
