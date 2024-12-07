import { StyleSheet, View } from "react-native";
import { type ViewProps } from "react-native";
import { CLabel } from "../text/CLabel";
import { CVar } from "../battle/CVar";
import { TransparentBlack } from "@/constants/TransparentBlack";
import { CText } from "../text/CText";
import { useData } from "../CDataProvider";


export function CControlPanel({children, style, ...rest}: ViewProps) {
  const {coins} = useData();

  return (
    <View style={style}>
      <View style={styles.row}>
        <CVar name="" hp={20} style={styles.var} color="#a085c4" bgColor="#663399" />
        <CText outlined size={25} style={styles.coins}>$000000{coins}</CText>
      </View>
      <View style={styles.buttonContainer} {...rest}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width:"100%",
    maxHeight: 110,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
    backgroundColor: TransparentBlack,
  },
  row: {
    flexDirection: "row",
  },
  var: {
    width: "60%",
    height: 20,
    transform: [{translateY: -5}],
    zIndex: 9999,
  },
  coins: {
    position: "absolute",
    transform: [{translateY: -7}],
    right: 0,
  }
});
