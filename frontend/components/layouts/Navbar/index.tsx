import { View, Text } from "react-native";
import { Image } from "expo-image";
import type { NavItemType } from "./NavItemGroup";
import NavItemGroup from "./NavItemGroup";
import { useState } from "react";
import { INITIAL_NAVS } from "@/constants/initialValues";
import Button from "@/components/common/Button";

const Logo = require("@/assets/images/logo.png");

export default function Navbar({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [navs, setNavs] = useState<NavItemType[]>(INITIAL_NAVS);
  const handleNavClick = (idx: number, value: boolean) => {
    const updated = navs.map((nav, index) => {
      if (index === idx) {
        nav.active = value;
      }
      return nav;
    });
    setNavs(updated);
  };
  return (
    <View
      className={`absolute top-0 left-0 h-full bg-[#EA4C7C] z-50 transition-all duration-500 ease-in-out ${
        visible ? "w-[60%]" : "w-0"
      }`}
    >
      <View className="flex-1 w-full p-4 flex flex-col justify-between items-start">
        <View className=" w-full flex flex-col gap-8">
          <Image source={Logo} style={styles.img} />
          <NavItemGroup
            items={navs}
            onSelect={handleNavClick}
            onClose={onClose}
          />
          <View className="h-px bg-white w-4/5 ml-2"></View>
          <View className="flex flex-col gap-2 ml-2">
            <Text className="text-white text-sm">Privacy Policy</Text>
            <Text className="text-white text-sm">Terms & Conditions</Text>
          </View>
        </View>
        <View className="w-full px-2">
          <Button
            type="default"
            label="Logout"
            icon="sign-out"
            iconPosition="left"
          />
        </View>
      </View>
    </View>
  );
}

const styles = {
  img: {
    height: 100,
    width: 100,
  },
};
