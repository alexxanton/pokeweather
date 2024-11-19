import Slider from '@react-native-community/slider';
import { useData } from '../CDataProvider';
import { Pressable, StyleSheet, View } from 'react-native';
import { CText } from '../CText';
import { CButton } from '../CButton';

export function TestingPanel() {
  const {setTemp, setWindSpeed, hour, setHour, setDescription} = useData();

  return (
    <View style={styles.container}>
      <View>
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={45}
          step={1}
          onValueChange={setTemp}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1EB1FC"
        />
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={45}
          step={0.5}
          onValueChange={setWindSpeed}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="red"
        />
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={23}
          step={1}
          onValueChange={setHour}
          minimumTrackTintColor="#663399"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#663399"
        />
      </View>
      <View style={styles.button}>
        <CButton onPress={() => setDescription("thunder")}>
          <CText outlined size={50}>{"T"}</CText>
        </CButton>
        <CText size={25}>{hour}</CText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
  }
});
