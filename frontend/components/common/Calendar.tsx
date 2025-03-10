import { View, Platform, TextInput, Pressable } from "react-native";
import * as ExpoCalendar from "expo-calendar";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CalendarProps {
  placeholder?: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  value?: any;
  onChange: (val: string) => void;
}

export default function Calendar({
  placeholder,
  icon,
  value,
  onChange,
}: CalendarProps) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await ExpoCalendar.getCalendarsAsync(
          ExpoCalendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        // console.log({ calendars });
      }
    })();
  }, []);

  return (
    <Pressable
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 6,
        borderColor: isFocused ? "#EA4C7C" : "#a0a0a0",
        backgroundColor: "white",

        // Proper shadow styles for iOS
        shadowColor: "#EA4C7C",
        shadowOffset: { width: 12, height: 12 },
        shadowOpacity: isFocused ? 1 : 0,
        shadowRadius: 4,

        // Elevation for Android (because shadow props don’t work on Android)
        elevation: isFocused ? 10 : 0,
      }}
      onPress={createCalendar}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <FontAwesome
        name="calendar"
        size={15}
        color={isFocused ? "#EA4C7C" : "#a0a0a0"}
      />

      <TextInput
        style={{
          flex: 1,
          marginLeft: 8,
          fontSize: 12,
          fontFamily: "Montserrat",
          color: isFocused ? "black" : "#a0a0a0",
          borderWidth: 0,
          outlineColor: "white",
        }}
        placeholder={isFocused ? "" : placeholder}
        placeholderTextColor="#a0a0a0"
        value={value}
        cursorColor="black"
        onChangeText={(val) => onChange(val)}
      />
    </Pressable>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await ExpoCalendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource() // ✅ Uses iOS default calendar source
      : { isLocalAccount: true, name: "Expo Calendar", type: "local" }; // ✅ Android fix

  const newCalendarID = await ExpoCalendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: ExpoCalendar.EntityTypes.EVENT,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: ExpoCalendar.CalendarAccessLevel.OWNER,
  });
}
