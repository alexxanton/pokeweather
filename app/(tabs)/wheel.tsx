import { StyleSheet, View } from 'react-native';
import { CText } from '@/components/text/CText';
import { CControlPanel } from '@/components/containers/CControlPanel';
import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import React, { useEffect, useState } from 'react';
import { CPadding } from '@/components/containers/CPadding';
import { useData } from '@/components/CDataProvider';
import { TransparentBlack } from "@/constants/TransparentBlack";

import AdButton from '@/assets/images/buttons/AdButton';
import SpinButton from '@/assets/images/buttons/SpinButton';
import WheelSVG from '@/assets/images/misc/Wheel';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Image } from 'expo-image';
import axios from 'axios';
import { randint } from '@/utils/randint';
import { playSound } from '@/utils/sounds/playSound';
import { DATABASE_SERVER_URI } from '@/constants/URI';
import { Audio } from 'expo-av';


export default function Wheel() {
  const {wheelTries, setWheelTries, sounds, coins, setCoins, userId} = useData();
  const [reward, setReward] = useState("");
  const [smallImage, setSmallImage] = useState(false);
  const pokemonSprite = (specie: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${specie}.png`;
  const pokemonCry = (specie: number) => `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${specie}.ogg`;
  const [image, setImage] = useState(pokemonSprite(1));
  const rewards = ["pokemon", "coins", "bills"];
  const coinsImage = require("@/assets/images/misc/coins.png");
  const billsImage = require("@/assets/images/misc/bills.png");
  const rotation = useSharedValue(0);
  const wheelScale = useSharedValue(1);
  const yReward = useSharedValue(0);
  const rewardOpacity = useSharedValue(0);
  const rewardIndex = useSharedValue(-1);

  const playCrySound = async (specie: number) => {
    const { sound } = await Audio.Sound.createAsync(
      {uri: pokemonCry(specie)}
    );

    sound.setVolumeAsync(0.3)
    await sound.playAsync();
    setTimeout(() => {
      sound.unloadAsync();
    }, 10000);
  }

  const wheelAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: wheelScale.value },
    ]
  }));
  
  const rewardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: yReward.value }],
    opacity: rewardOpacity.value,
    zIndex: rewardIndex.value,
  }));

  const wheelAnim = () => {
    playSound(sounds.wheel_spin);
    rotation.value = 0;
    wheelScale.value = 1;
    rewardOpacity.value = withTiming(0);
    rewardIndex.value = 0;

    rotation.value = withTiming(360 * 2, { duration: 2000, easing: Easing.elastic() });
    wheelScale.value = withSequence(
      withTiming(1.5, { duration: 1000 }),
      withTiming(1, { duration: 1000 }),
      withTiming(0.8, { duration: 0 }),
      withTiming(1.2, { duration: 100 }),
      withTiming(1, { duration: 100 }),
    );

    setTimeout(() => {
      playSound(sounds.wheel_pop);
      playSound(sounds.wheel_reward);

      yReward.value = 0;
      rewardOpacity.value = withTiming(1, { duration: 500 }, () => {
        rewardOpacity.value = withDelay(2000, withTiming(0, { duration: 500 }));
      });
      yReward.value = withSequence(
        withTiming(-100, { duration: 500 }),
        withTiming(200, { duration: 1000 }),
      );
    }, 2000);

    setTimeout(() => {
      rewardIndex.value = -1;
      setReward("");
    }, 3250);
  };

  const spinTheWheel = () => {
    if (wheelTries > 0 && !reward) {
      setReward(rewards[randint(0, rewards.length - 1)]);
      setWheelTries(wheelTries - 1);
    }
  };

  const newPokemon = async () => {
    const randomPokemon = randint(1, 807);
    await axios.post(`${DATABASE_SERVER_URI}/catch-pokemon`, {
      specie: randomPokemon,
      level: randint(1, 100),
      id: userId
    });
    setTimeout(() => {
      setSmallImage(true);
      setImage(pokemonSprite(randomPokemon));
    }, 200);

    setTimeout(() => {
      playCrySound(randomPokemon);
    }, 2000);
  };

  const addMoney = (image: any, money: number) => {
    setTimeout(() => {
      setSmallImage(false);
      setImage(image);
    }, 200);

    setTimeout(() => {
      setCoins(coins + money);
    }, 3000);
  };

  useEffect(() => {
    if (reward) {
      switch (reward) {
        case "pokemon": newPokemon(); break;
        case "coins": addMoney(coinsImage, 1000); break;
        case "bills": addMoney(billsImage, 5000); break;
      }
      
      wheelAnim();
    }
  }, [reward]);

  return (
    <CPadding>
      <CArrowButton />
      <View style={styles.container}>
        <Animated.View style={[styles.container, wheelAnimStyle]}>
          <CButton onPress={spinTheWheel}>
            <WheelSVG width={300} height={300} />
          </CButton>
        </Animated.View>
        <Animated.View style={[styles.reward, rewardAnimStyle]}>
          <Image
            source={image}
            style={smallImage ? styles.pokeImage : styles.image}
          />
        </Animated.View>
      </View>
      <View style={styles.tries}>
        <CText size={30}>x {wheelTries}</CText>
      </View>
      <CControlPanel>
        <CButton href="/ad">
          <AdButton width={90} height={90} />
        </CButton>
        <CButton onPress={spinTheWheel}>
          <SpinButton width={180} height={90} />
        </CButton>
      </CControlPanel>
    </CPadding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  wheel: {
    width: "85%",
    aspectRatio: 1
  },
  tries: {
    marginBottom: 20,
    width: "35%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    gap: 10,
    backgroundColor: TransparentBlack
  },
  reward: {
    position: "absolute"
  },
  image: {
    height: 300,
    width: 300,
  },
  pokeImage: {
    height: 200,
    width: 200,
  }
});
