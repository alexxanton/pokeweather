import { StyleSheet, View } from 'react-native';
import { CBackground } from '@/components/CBackground';
import { CText } from '@/components/CText';
import { CButton } from '@/components/CButton';
import { ButtonContainer } from '@/components/ButtonContainer';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

import Pokeball from '@/assets/images/misc/Pokeball';
import WheelButton from '@/assets/images/buttons/WheelButton';
import TeamButton from '@/assets/images/buttons/TeamButton';
import MissionsButton from '@/assets/images/buttons/MissionsButton';
import ProfileButton from '@/assets/images/buttons/ProfileButton';


export default function Index() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState();
  const weatherKey = process.env.EXPO_PUBLIC_API_KEY;

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const { latitude, longitude } = location.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`;
    const response = await axios.get(url);
    setWeather(response.data);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <CBackground>

      <View>
        {weather ? <CText size={20} outlined>{weather.name}</CText> : <CText size={20}>Loading...</CText>}
        <View style={styles.profile}>
          <CButton href="/profile">
            <ProfileButton />
          </CButton>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.temperature}>
          {weather ? (
            <>
              <CText size={75} outlined>{Math.round(weather.main.temp)}</CText>
              <CText size={25} outlined style={styles.degree}>O</CText>
            </>
          ) : (
            <CText size={45}>Loading...</CText>
          )}
        </View>
        <CButton href="/battle">
          <Pokeball width={200} height={200} />
        </CButton>
        {weather ? <CText outlined size={40}>{weather.weather[0].description}</CText> : <CText size={40}>Loading...</CText>}
      </View>


      <ButtonContainer>
        <CButton href="/wheel">
          <WheelButton width={90} height={90} />
        </CButton>
        <CButton href="/team">
          <TeamButton width={90} height={90} />
        </CButton>
        <CButton href="/missions">
          <MissionsButton width={90} height={90} />
        </CButton>
      </ButtonContainer>
      
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    flexDirection: "row",
  },
  degree: {
    position: 'absolute',
    transform: [{ translateY: -10 }],
  },
  location: {
    position: "absolute",
  },
  profile: {
    alignSelf: "flex-end",
    position: "absolute",
  },
});
