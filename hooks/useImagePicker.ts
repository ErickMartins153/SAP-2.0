import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Linking } from "react-native";

export default function useImagePicker() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageURI, setImageURI] = useState<string | null>();
  const [aspect, setAspect] = useState<[number, number]>([2, 3]);

  function changeAspect(newAspect: [number, number]) {
    setAspect(newAspect);
  }

  async function openLibrary() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  }

  async function openCamera() {
    if (!status?.granted && !status?.canAskAgain) {
      await Linking.openSettings();
    }

    if (!status?.granted) {
      const a = await requestPermission();
    }

    if (status?.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: aspect,
        quality: 1,
      });

      if (!result.canceled) {
        setImageURI(result.assets[0].uri);
      }
    }
  }

  return {
    openLibrary,
    openCamera,
    imageURI,
    aspect: aspect[0] / aspect[1],
    changeAspect,
  };
}
