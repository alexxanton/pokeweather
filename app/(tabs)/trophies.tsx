import { StyleSheet, View } from "react-native";
import { CButton } from "@/components/buttons/CButton";
import { CArrowButton } from "@/components/buttons/CArrowButton";
import { CText } from "@/components/text/CText";
import { useData } from "@/components/CDataProvider";
import React from "react";

export default function Trophies() {
  const {temp, setTemp} = useData();
  return (
    <>
      <CArrowButton />
      <View style={styles.container}>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
