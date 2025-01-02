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
import { DATABASE_SERVER_URI } from '@/constants/URI';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export function CMainScreen() {
  const [error, setError] = useState("");
  const {setUserId, userId, setCoins, setBoost, temp, setTemp, setDescription, setWindSpeed, setHour} = useData();
  const [weatherData, setWeatherData] = useState<Record<string, any>>();
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const yPokeball = useSharedValue(0);
  const wobbleRotation = useSharedValue(0);
  const pokeballScale = useSharedValue(1);
  const pokeballBrightness = useSharedValue(1);
  const getUserId = async () => setUserId(parseInt(await getStoredData("id")));

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: yPokeball.value },
      { rotate: `${wobbleRotation.value}deg` },
      { scale: pokeballScale.value },
    ],
    filter: [
      { brightness: pokeballBrightness.value }
    ],
  }));

  const pokeballAnim = () => {
    yPokeball.value = withRepeat(withTiming(-10, { duration: 2000 }), -1, true);
    wobbleRotation.value = withRepeat(
      withDelay(3000,
        withSequence(
          withTiming(15, { duration: 100 }),
          withTiming(-15, { duration: 100 }),
          withTiming(10, { duration: 80 }),
          withTiming(-10, { duration: 80 }),
          withTiming(5, { duration: 60 }),
          withTiming(-5, { duration: 60 }),
          withTiming(0, { duration: 50 })
        )
      ), -1, true
    );
  };

  const transitionAnim = () => {
    pokeballScale.value = withTiming(100, { duration: 2000 });
    pokeballBrightness.value = withTiming(0, { duration: 1000 });

    setTimeout(() => {
      pokeballScale.value = 1;
      pokeballBrightness.value = 1;
    }, 2000);
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`${DATABASE_SERVER_URI}/user/${userId}`);
      setCoins(response.data[0].coins);
      setBoost(response.data[0].boost);
    } catch (error) {
      console.log(error);
    }
  };

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
    pokeballAnim();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserData();
    }
  }, [userId]);

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
            <Animated.View style={[styles.pokeball, animStyle]}>
              <CButton href="/battle" transitionAnim={transitionAnim}>
                <Pokeball width={200} height={200} />
              </CButton>
            </Animated.View>
            {/* <TestingPanel /> */}
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
  pokeball: {
    zIndex: 9999
  }
});
