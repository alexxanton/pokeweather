import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler } from "react-native";

export function CPreventBackButton() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "If you leave, all progress will be lost.", [
          { text: "LEAVE", style: "default", onPress: () => router.back() },
          { text: "CANCEL", style: "default" },
        ]);
        return true; // Block the back action
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return null;
}