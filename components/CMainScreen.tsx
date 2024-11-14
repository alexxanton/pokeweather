import { StyleSheet, View } from 'react-native';
import { CText } from '@/components/CText';
import { CButton } from '@/components/CButton';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

import Pokeball from '@/assets/images/misc/Pokeball';
import ProfileButton from '@/assets/images/buttons/ProfileButton';

export function CMainScreen() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState();
  const weatherApiKey = process.env.EXPO_PUBLIC_API_KEY;

  const getWeatherData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const { latitude, longitude } = location.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };

  useEffect(() => {
    getWeatherData();
  }, []);
  
  return (
    <>{weatherData ? (
      <>
        <View>
          <CText size={20} outlined>{weatherData.name}</CText>
          <View style={styles.profile}>
            <CButton href="/profile">
              <ProfileButton />
            </CButton>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.temperature}>
            <CText size={75} outlined>{Math.round(weatherData.main.temp)}</CText>
            <CText size={25} outlined style={styles.degree}>O</CText>
          </View>
          <CButton href="/battle">
            <Pokeball width={200} height={200} />
          </CButton>
          <CText outlined size={20} style={styles.desc}>{`${weatherData.weather[0].description} - ${weatherData.wind.speed} km/h`}</CText>
        </View>
      </>
    ) : (
      <View style={styles.container}>
        <CText size={35} outlined>Loading...</CText>
      </View>
    )}</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    flexDirection: "row-reverse",
  },
  degree: {
    position: "absolute",
    right: -25,
  },
  location: {
    position: "absolute",
  },
  profile: {
    alignSelf: "flex-end",
    position: "absolute",
  },
  desc: {
    position: "absolute",
    bottom: "10%"
  },
});
