import ScreenTransition from "@/components/animation/ScreenTransition";
import Button from "@/components/common/Button";
import CreateProfileContainer from "@/components/containers/CreateProfileContainer";
import FooterContainer from "@/components/containers/FooterContainer";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { fetchSessionDecision, startKycVerification } from "@/lib/scripts/kyc";
import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import Spinner from "@/components/common/Spinner";
import { useUser } from "@/components/providers/UserProvider";

const IdCard = require("@/assets/images/id-card.png");

export default function Kyc() {
  const [url, setUrl] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionApproved, setSessionApproved] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const { user } = useUser();

  const handleKycClick = async () => {
    try {
      const response = await startKycVerification();
      if (response.success) {
        const { url, sessionId, status } = response.data;
        setUrl(url);
        setSessionId(sessionId);
        setSessionApproved(false);
        setStatus(status);
      }
    } catch (error) {
      console.log("start kyc error: ", error);
    }
  };

  const checkSessionStatus = async () => {
    try {
      if (sessionId) {
        const response = await fetchSessionDecision(sessionId);
        const { data, success } = response;
        setStatus(data.status);
        if (success && data.status === "Approved") {
          setSessionApproved(true);
        }
      }
    } catch (error) {
      console.log("check session status error: ", error);
    }
  };

  useEffect(() => {
    if (user?.kyc && user.kyc.sessionId) {
      const { sessionId, url, status } = user.kyc;
      console.log("session url: ", url);
      setUrl(url);
      setSessionId(sessionId);
      setStatus(status);
    }
  }, [user?.kyc]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    // If there's a session and URL, start the polling for session status
    if (sessionId && !sessionApproved) {
      intervalId = setInterval(() => {
        checkSessionStatus();
      }, 15000); // Check every 15 seconds
    }

    // Cleanup the interval if the session is approved or component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sessionId, sessionApproved]);

  return (
    <>
      {url ? (
        <View className="p-4 flex-1">
          <View className="mb-2">
            <Text className="font-sans text-lg font-semibold text-black">
              KYC VERIFICATION
            </Text>
            <Text className="font-sans text-sm text-gray-400 mt-1">
              Verify your identity
            </Text>
          </View>
          <WebView source={{ uri: url }} style={styles.webview} />
          <View className="flex flex-row items-center justify-center p-4 gap-4">
            <Text className="text-center font-semibold text-pink-500">
              {status}
            </Text>
            <Spinner />
          </View>
        </View>
      ) : (
        <ScreenTransition animationKey={0} direction="enter">
          <CreateProfileContainer
            title="KYC VERIFICATION"
            subtitle="Verify your identity"
          >
            <Image source={IdCard} style={styles.idImage} />
          </CreateProfileContainer>
          <FooterContainer bottom={10}>
            <Button
              type="default"
              label="Verify"
              icon="id-card"
              iconPosition="right"
              onClick={handleKycClick}
            />
          </FooterContainer>
        </ScreenTransition>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  idImage: {
    width: 100,
    height: 100,
  },
  webview: {
    flex: 1,
    borderRadius: 10,
  },
});
