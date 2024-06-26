import { PropsWithoutRef, forwardRef, useRef } from "react";
import { StyleSheet, View } from "react-native";
import SelectDropdown, {
  type SelectDropdownProps,
} from "react-native-select-dropdown";
import StyledText from "../general/StyledText";
import Icon from "../general/Icon";
import { Colors } from "@/constants/Colors";

type DataItem = {
  [key: string]: any;
  nome: string;
  sobrenome?: string;
};

type SelectProps = {
  data: DataItem[];
  placeholder: string;
} & Omit<PropsWithoutRef<SelectDropdownProps>, "renderButton" | "renderItem">;

const Select = forwardRef<SelectDropdown, SelectProps>(
  ({ placeholder, onSelect: onSelection, ...props }, ref) => {
    return (
      <SelectDropdown
        ref={ref}
        key={placeholder}
        searchInputStyle={styles.dropdownSearchInputStyle}
        searchInputTxtColor={Colors.text}
        searchPlaceHolder="Nome do supervisor"
        searchPlaceHolderColor={Colors.placeholder}
        renderSearchInputLeftIcon={() => {
          return <Icon name="search" />;
        }}
        onSelect={(item: DataItem, index) => {
          if (item.nome.toLowerCase() === "sim") {
            return onSelection(true, index);
          } else if (item.nome.toLowerCase() === "não") {
            return onSelection(false, index);
          }
          return onSelection(item.nome, index);
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
                {(selectedItem &&
                  `${selectedItem.nome} ${selectedItem.sobrenome ?? ""}`) ||
                  placeholder}
              </StyledText>
              <Icon name={isOpened ? "chevron-up" : "chevron-down"} />
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
            >
              <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
              <StyledText
                style={[
                  styles.dropdownItemTxtStyle,
                  isSelected && { color: Colors.white },
                ]}
              >
                {`${item.nome} ${item.sobrenome ?? ""}`}
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
  },
  dropdownItemIconStyle: {
    marginRight: "2%",
  },
});

export default Select;
