import { useCallback, useContext, useLayoutEffect, useState } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import UserAvatar from "@/components/UI/UserAvatar";
// import PickerButton from "../components/PickerButton";
// import SubmitButton from "../components/UI/SubmitButton";
// import { PostContext } from "../store/post-context";
import Icon from "@/components/general/Icon";
import { router, useFocusEffect, useNavigation } from "expo-router";
import PickerButton from "@/components/post/PickerButton";
// import FormattedImage from "../components/UI/FormattedImage";
// import { AuthContext } from "../store/auth-context";

export default function AddPostScreen() {
  const navigation = useNavigation();
  const [appendedFiles, setAppendedFiles] = useState({});
  const [description, setDescription] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        router.navigate("(app)");

        return true;
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  // const postCtx = useContext(PostContext);
  // const { token } = useContext(AuthContext);

  // let imagePath = null;
  // const isImage = appendedFiles?.image ? true : false;

  // if (isImage) {
  //   imagePath = appendedFiles.image[0].uri;
  // }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {},
      title: "Postar",
    });
  }, [navigation]);

  function handleDescription(text: string) {
    setDescription(text);
  }

  function handleAppendFile(file: string, type: string) {
    if (file) {
      setAppendedFiles((prevFiles) => ({ ...prevFiles, [type]: file }));
    }
  }

  function handleRemoveImage() {
    // setAppendedFiles((prevFiles) => ({ ...prevFiles, image: null }));
  }

  function handleAddPost() {
    // const imageSanitizer = appendedFiles?.image
    //   ? appendedFiles?.image[0].uri
    //   : null;
    // const descriptionSanitizer = description ?? "Sem descrição";
    // postCtx.addPost(token, new Date(), imageSanitizer, descriptionSanitizer);
    // handleClearPage();
  }

  function handleClearPage() {
    setAppendedFiles({});
    setDescription("");
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
    >
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.headerIcons}>
            <Icon
              onPress={handleClearPage}
              name="corner-down-left"
              style={styles.returnIcon}
            />

            <View>
              <Icon name="trash-2" color="red" size={32} style={styles.icon} />
            </View>
          </View>
          <View style={styles.AvatarInputContainer}>
            <View>
              <UserAvatar size={90} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                multiline={true}
                autoCapitalize="sentences"
                placeholder="O que está acontecendo?"
                maxLength={280}
                style={styles.textInput}
                onChangeText={handleDescription}
                value={description}
              />
            </View>
          </View>
          <View style={styles.filesContainer}>
            {/* <FormattedImage
              path={imagePath}
              onDelete={handleRemoveImage}
              deleteButton={isImage}
            /> */}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.filesButtonsContainer}>
            {/* <PickerButton /> */}
            {/* <PickerButton
              size={32}
              icon="image"
              onConfirm={handleAppendFile}
              type="image"
            />
            <PickerButton size={32} icon="link" />
            <PickerButton size={32} icon="camera" type="camera" />
          </View>
          <View style={styles.submitButton}>
            <SubmitButton size={32} onSubmit={handleAddPost} />*/}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  returnIcon: {
    marginTop: 12,
    marginLeft: 0,
  },
  icon: {
    marginLeft: 0,
    marginTop: 12,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  section: {
    minHeight: 500,
    paddingTop: 100,
    backgroundColor: Colors.white,
    elevation: 4,
    marginHorizontal: 12,
    marginTop: 6,
    borderRadius: 6,
    paddingBottom: 16,
  },
  AvatarInputContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    marginLeft: 4,
    marginRight: 12,
    width: 230,
  },
  textInput: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
  filesContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: "flex-start",
  },
  imageButtonContainer: {
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  filesButtonsContainer: {
    flexDirection: "row",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
