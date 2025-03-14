import {
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import * as ExpoCalendar from "expo-calendar";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

interface CalendarProps {
  placeholder?: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  value?: Date | null;
  invalid?: boolean;
  invalidText?: string;
  onChange: (date: Date) => void;
}

export default function CalendarInput({
  placeholder = "Select date",
  icon,
  value,
  onChange,
}: CalendarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Calendar access required");
      }
    })();
  }, []);

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (date) {
      onChange(date);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <View
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
      >
        <FontAwesome
          name={icon ?? "calendar"}
          size={15}
          color={isFocused ? "#EA4C7C" : "#a0a0a0"}
        />

        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => {
            setShowPicker(true);
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          activeOpacity={0.8}
        >
          <TextInput
            style={[
              styles.input,
              { color: isFocused ? "black" : "#a0a0a0", fontWeight: "bold" },
            ]}
            placeholder={isFocused ? "" : placeholder}
            placeholderTextColor="#a0a0a0"
            value={value ? formatDate(value) : ""}
            editable={false}
            pointerEvents="none"
            onBlur={() => setIsFocused(false)}
          />
        </TouchableOpacity>
      </View>

      {showPicker &&
        (Platform.OS === "android" ? (
          <DateTimePicker
            value={value ? value : new Date()}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        ) : (
          <Modal transparent animationType="slide">
            <View style={styles.iosPickerContainer}>
              <DateTimePicker
                value={value ? value : new Date()}
                mode="date"
                display="inline"
                onChange={handleDateChange}
                accentColor="#EA4C7C"
                style={styles.iosPicker}
              />
              <TouchableOpacity
                style={styles.iosDoneButton}
                onPress={() => setShowPicker(false)}
              >
                <FontAwesome name="check" size={20} color="#EA4C7C" />
              </TouchableOpacity>
            </View>
          </Modal>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "white",
    shadowColor: "#EA4C7C",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 8,
  },
  input: {
    fontSize: 14,
    fontFamily: "Montserrat",
    borderWidth: 0,
  },
  iosPickerContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  iosPicker: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 20,
  },
  iosDoneButton: {
    position: "absolute",
    top: 60,
    right: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
});
