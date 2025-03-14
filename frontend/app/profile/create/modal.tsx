import { View, Dimensions, Alert } from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import Avatar from "@/components/common/Avatar";
import AvatarGroup from "@/components/common/AvatarGroup";
import Button from "@/components/common/Button";
import ModalContainer from "@/components/containers/ModalContainer";
import { useRouter } from "expo-router";
import Spinner from "@/components/common/Spinner";
import * as Filesystem from "expo-file-system";
import { uploadImage } from "@/lib/scripts/upload";
import { User } from "@/types";
import { useUser } from "@/components/providers/UserProvider";
import { updateMe } from "@/lib/scripts/auth";

export default function Modal() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageGroup, setSelectedImageGroup] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [avatarSize, setAvatarSize] = useState(
    Dimensions.get("window").width > 400
      ? 200
      : Dimensions.get("window").width * 0.4
  );
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;

  const iconSize = screenWidth > 400 ? 80 : screenWidth * 0.15; // Adjust icon size based on screen width

  const { user, updateUser } = useUser();

  const handleCameraClick = async () => {
    setUploadLoading(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Camera permissions not granted.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        console.log("Camera operation was canceled.");
      } else {
        const uri = result.assets[0].uri;
        setSelectedImage(uri); // Set as the primary image
        setSelectedImageGroup((prev) => [...prev, uri]); // Append to image group
      }
    } catch (error) {
      console.error("Error launching camera:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleLibraryClick = async () => {
    setUploadLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrected media type
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setSelectedImage(uris[0]); // Set the first image as the primary selected image
      setSelectedImageGroup((prev) => [...prev, ...uris]); // Correctly append images to the array
    }

    setUploadLoading(false);
  };

  const handleSaveClick = async () => {
    if (!selectedImage && selectedImageGroup.length === 0) return;

    try {
      setLoading(true);
      let formData = new FormData();
      selectedImageGroup.forEach((image, index) => {
        formData.append("images", {
          uri: image,
          name: `image_${Date.now()}_${index}.jpg`,
          type: "image/jpeg",
        } as unknown as Blob);
      });
      const uploadResponse = await uploadImage(formData);
      if (uploadResponse.success) {
        const { imageUrls } = uploadResponse.data;
        const updatingUser: User = {
          ...user,
          profilePics: imageUrls,
        };
        const userResponse = await updateMe(updatingUser);
        if (userResponse.success) {
          const { data } = userResponse;
          updateUser(data);
          Alert.alert("Profile pictures saved successfully");
          if (user?.name) {
            router.replace("/verify/kyc");
          } else {
            router.replace("/profile/create/detail");
          }
        }
      }
    } catch (error) {
      console.log("profile picture save error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { profilePics } = user as User;
    if (profilePics) {
      setSelectedImage(profilePics[0]);
      setSelectedImageGroup(profilePics);
    }
  }, []);

  return (
    <ModalContainer>
      <View className="w-full flex flex-col items-center justify-center h-[80vh] gap-10 relative bg-white">
        <View className="w-full flex items-center justify-center absolute top-10">
          {selectedImage ? (
            <Avatar imgSource={selectedImage} size={avatarSize} />
          ) : (
            <Avatar size={avatarSize * 1.5}>
              <FontAwesome name="user" size={iconSize} color="#EA4C7C" />
            </Avatar>
          )}
        </View>
        {uploadLoading && <Spinner />}
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
              disabled={!selectedImage || loading}
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
