import React, { useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { Audio } from 'expo-av';
import { useData } from './CDataProvider';


export function CMusic({ children }: ViewProps) {
  const [battleMusic, setBattleMusic] = useState<Audio.Sound>();
  const [adMusic, setAdMusic] = useState<Audio.Sound>();
  const adSong = require("../assets/music/ad_song.ogg");
  const battleSong = require("@/assets/music/dpp_wild.ogg");
  const {song} = useData();

  useEffect(() => {
    const loadMusic = async (setSound: React.Dispatch<React.SetStateAction<any>>, source: any) => {
      const { sound } = await Audio.Sound.createAsync(source, { isLooping: true });

      sound.setVolumeAsync(0.2);
      setSound(sound);
    };

    loadMusic(setAdMusic, adSong);
    loadMusic(setBattleMusic, battleSong);
  }, []);
  
  useEffect(() => {
    try {
      if (song === "battle") {
        battleMusic?.setVolumeAsync(0.2);
        battleMusic?.playAsync();
      } else if (song === "ad") {
        adMusic?.setVolumeAsync(0.2);
        adMusic?.playAsync();
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }

    if (song === "stop_battle") {
      if (battleMusic) fadeOutAndStop(battleMusic);
    } else if (song === "stop_ad") {
      if (adMusic) fadeOutAndStop(adMusic);
    }
  }, [song]);

  const fadeOutAndStop = async (sound: Audio.Sound) => {
    try {
      console.log("Fading out music");
      const fadeDuration = 2000;
      const steps = 20;
      const interval = fadeDuration / steps;
      const volumeStep = 0.2 / steps;

      for (let i = 0; i < steps; i++) {
        const currentVolume = 0.2 - i * volumeStep;
        await sound.setVolumeAsync(currentVolume);
        await new Promise((resolve) => setTimeout(resolve, interval));
      }

      await sound.stopAsync();
      console.log("Music stopped");
    } catch (error) {
      console.error("Error fading out:", error);
    }
  };

  return <View style={{ flex: 1 }}>{children}</View>;
}
