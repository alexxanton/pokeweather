import { StyleSheet, View } from 'react-native';
import { CText } from '@/components/text/CText';
import { CButton } from '@/components/buttons/CButton';
import React, { useEffect, useState } from 'react';
import { useData } from './CDataProvider';
import * as Location from 'expo-location';
import axios from 'axios';

import Pokeball from '@/assets/images/misc/Pokeball';
import ProfileButton from '@/assets/images/buttons/ProfileButton';
import { TestingPanel } from './testing/TestingPanel'
import { getStoredData } from '@/utils/asyncDataStorage';

export function CMainScreen() {
  const [error, setError] = useState("");
  const {setUserId, temp, setTemp, setDescription, setWindSpeed, setHour} = useData();
  const [weatherData, setWeatherData] = useState<Record<string, any>>();
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const getUserId = async () => setUserId(await getStoredData("id"));

  const getWeatherData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };

  useEffect(() => {
    // ! TODO: set 5 min interval
    getUserId();
    getWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      setTemp(Math.round(weatherData.main.temp));
      setDescription(weatherData.weather[0].description);
      setWindSpeed(weatherData.wind.speed);
      setHour(new Date().getHours());
    }
  }, [weatherData]);

  return (
    <>
      {weatherData ? (
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
              <CText size={75} outlined>{temp}</CText>
              <CText size={25} outlined style={styles.degree}>O</CText>
            </View>
            <CButton href="/battle">
              <Pokeball width={200} height={200} />
            </CButton>
            <TestingPanel />
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <CText size={35} outlined>Loading...</CText>
        </View>
      )}
    </>
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
