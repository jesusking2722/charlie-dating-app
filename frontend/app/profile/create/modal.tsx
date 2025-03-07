import { View, useWindowDimensions, Dimensions } from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import Avatar from "@/components/common/Avatar";
import AvatarGroup from "@/components/common/AvatarGroup";
import Button from "@/components/common/Button";
import ModalContainer from "@/components/containers/ModalContainer";
import { useRouter } from "expo-router";

export default function Modal() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageGroup, setSelectedImageGroup] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { width } = useWindowDimensions(); // Get screen width
  const screenWidth = Dimensions.get("window").width;

  const avatarSize = screenWidth > 400 ? 200 : screenWidth * 0.4; // Adjust for larger screens
  const iconSize = screenWidth > 400 ? 80 : screenWidth * 0.15; // Adjust icon size based on screen width

  const handleCameraClick = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleLibraryClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: 4,
      allowsEditing: true,
      quality: 4,
    });
    setLoading(true);

    if (!result.canceled) {
      setSelectedImage(result.assets[result.assets.length - 1].uri);
      const uris = result.assets.map((asset) => asset.uri);
      setSelectedImageGroup([...selectedImageGroup, ...uris]);
    }
    setLoading(false);
  };

  const handleSaveClick = async () => {};

  return (
    <ModalContainer>
      <View className="w-full flex flex-col items-center justify-center h-[80vh] gap-10 relative bg-white">
        <View className="w-full flex items-center justify-center absolute top-10">
          {selectedImage ? (
            <Avatar imgSource={selectedImage} size={avatarSize} />
          ) : (
            <Avatar size={avatarSize * 0.75}>
              <FontAwesome name="user" size={iconSize} color="#EA4C7C" />
            </Avatar>
          )}
        </View>
        <View>
          <AvatarGroup avatars={selectedImageGroup} />
        </View>
        <View className="w-full flex flex-col items-center justify-center gap-2 absolute bottom-0">
          <Button
            type="default"
            label="Camera"
            icon="camera"
            iconPosition="right"
            onClick={handleCameraClick}
          />
          <Button
            type="outline"
            label="Library"
            icon="folder"
            iconPosition="right"
            onClick={handleLibraryClick}
          />
          <View className="w-full grid grid-cols-2 gap-4">
            <Button
              type="default"
              label="Save"
              icon="save"
              iconPosition="right"
              loading={loading}
              onClick={handleSaveClick}
              disabled={!selectedImage}
            />
            <Button
              type="outline"
              label="Dismiss"
              icon="times"
              iconPosition="right"
              onClick={() => {
                router.replace("/profile/create/detail");
              }}
            />
          </View>
        </View>
      </View>
    </ModalContainer>
  );
}
