import Slider from '@react-native-community/slider';
import { useData } from '../CDataProvider';
import { StyleSheet, View } from 'react-native';
import { CText } from '../text/CText';
import { CButton } from '../buttons/CButton';
import { useState } from 'react';

export function TestingPanel() {
  const {setTemp, setWindSpeed, hour, setHour, setDescription} = useData();
  const [symbol, setSymbol] = useState("⚡");
  const [index, setIndex] = useState(0);

  const changeDesc = () => {
    const states = [
      {symbol: "⚡", desc: "thunder"},
      {symbol: "💧", desc: "rain"},
      {symbol: "❄️", desc: "snow"},
      {symbol: "☀️", desc: "clear"},
      {symbol: "☁️", desc: "cloudy"},
      {symbol: "⛅", desc: "few clouds"},
    ]
    
    const nextIndex = index < 4 ? index + 1 : 0;
    setDescription(states[index]["desc"]);
    setSymbol(states[nextIndex]["symbol"]);
    setIndex(nextIndex);
  };

  return (
    <View style={styles.container}>
      <View>
        <Slider
          style={{ width: 250, height: 35 }}
          minimumValue={0}
          maximumValue={45}
          step={1}
          onValueChange={setTemp}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1EB1FC"
        />
        <Slider
          style={{ width: 250, height: 35 }}
          minimumValue={0}
          maximumValue={300}
          step={1}
          onValueChange={setWindSpeed}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="red"
        />
        <Slider
          style={{ width: 250, height: 35 }}
          minimumValue={0}
          maximumValue={23}
          step={1}
          onValueChange={setHour}
          minimumTrackTintColor="#663399"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#663399"
        />
      </View>
      <View style={styles.side}>
        <CButton onPress={changeDesc}>
          <CText size={50} style={{lineHeight: 60}}>{symbol}</CText>
        </CButton>
        <CText outlined size={25} style={{alignSelf: "center"}}>{hour}</CText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  side: {
    justifyContent: "center",
    gap: 10
  }
});
