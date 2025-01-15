import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, BackHandler } from "react-native";
import { useData } from "../CDataProvider";

export function CHandleBackButton({ask}: {ask?: boolean}) {
  const router = useRouter();
  const {setSong} = useData();

  const goBack = () => {
    setSong("");
    router.back();
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (ask) {
          Alert.alert("Hold on!", "Are you sure you want to escape?", [
            { text: "ESCAPE", style: "default", onPress: goBack },
            { text: "CANCEL", style: "default" },
          ]);
        } else {
          goBack();
        }
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