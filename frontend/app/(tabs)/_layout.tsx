import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Button from "@/components/common/Button";
import { View, TouchableWithoutFeedback, Keyboard, Text } from "react-native"; // Add TouchableWithoutFeedback
import { useState } from "react";
import Navbar from "@/components/layouts/Navbar"; // Ensure Navbar component is correctly imported
import { Image } from "expo-image";

const Logo = require("@/assets/images/logo.png");

export default function TabLayout() {
  const [visible, setVisible] = useState<boolean>(false);

  // Function to handle hiding the navbar when clicking anywhere outside
  const handleCloseNavbar = () => {
    setVisible(false);
  };

  const CustomHeader = () => (
    <View className="w-full flex flex-row items-center px-4 bg-white">
      <Button type="icon" icon="bars" onClick={() => setVisible(true)} />
      <View className="flex-1 flex-row justify-center items-center gap-4">
        <Image source={Logo} alt="LOGO" style={{ width: 70, height: 70 }} />
        <Text className="font-semibold text-black">CHARLIE UNICORN AI</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* TouchableWithoutFeedback will trigger closing the navbar */}
      <TouchableWithoutFeedback onPress={handleCloseNavbar}>
        <View style={{ flex: 1 }}>
          {/* Tabs component */}
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: "#EA4C7C",
              headerShadowVisible: false,
              headerTintColor: "#fff",
              tabBarStyle: {
                backgroundColor: "#ffffff",
              },
              header: CustomHeader,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "home" : "home-outline"}
                    color={color}
                    size={24}
                  />
                ),
                animation: "fade",
              }}
            />
            <Tabs.Screen
              name="find"
              options={{
                title: "",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "compass" : "compass-outline"}
                    color={color}
                    size={24}
                  />
                ),
                animation: "fade",
              }}
            />
            <Tabs.Screen
              name="match"
              options={{
                title: "",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "heart" : "heart-outline"}
                    color={color}
                    size={24}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="message"
              options={{
                title: "",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "message" : "message-outline"}
                    color={color}
                    size={24}
                  />
                ),
                animation: "fade",
              }}
            />
            <Tabs.Screen
              name="contact"
              options={{
                title: "",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "contacts" : "contacts-outline"}
                    color={color}
                    size={24}
                  />
                ),
                animation: "fade",
              }}
            />
          </Tabs>
        </View>
      </TouchableWithoutFeedback>

      {/* Navbar will be conditionally rendered and overlaid */}
      {visible && (
        <Navbar visible={visible} onClose={() => setVisible(false)} />
      )}
    </View>
  );
}
