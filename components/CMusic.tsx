import React, { useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { Audio } from 'expo-av';
import { randint } from '@/utils/randint';
import { battleMusicMap } from '@/utils/battleFunctions/musicMap';
import { useData } from './CDataProvider';

type RandomKey = keyof typeof battleMusicMap;


export function CMusic({children}: ViewProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const adSong = require("@/assets/music/ad_song.mp3");
  const {song} = useData();
  const [preloadedSounds, setPreloadedSounds] = useState<{ [key: string]: Audio.Sound }>({});

  useEffect(() => {
    const preloadSounds = async () => {
      const sounds: { [key: string]: Audio.Sound } = {};
      const keys = Object.keys(battleMusicMap);

      for (const key of keys) {
        const { sound } = await Audio.Sound.createAsync(battleMusicMap[key as RandomKey]);
        sounds[key] = sound;
      }

      // Add the adSong to the preload sounds as well
      const { sound: adSound } = await Audio.Sound.createAsync(adSong);
      sounds["adSong"] = adSound;

      setPreloadedSounds(sounds);
      console.log("All sounds preloaded");
    };

    preloadSounds();

    // Clean up preloaded sounds when component unmounts
    return () => {
      Object.values(preloadedSounds).forEach((sound) => {
        sound.unloadAsync();
      });
    };
  }, []); // Empty array to run only on mount

  useEffect(() => {
    let soundObject: Audio.Sound;
    const keys = Object.keys(battleMusicMap);
    const randomKey = keys[randint(0, keys.length)] as RandomKey;
    if (!song) return;

    const playMusic = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          song === "battle" ? battleMusicMap[randomKey] : adSong,
          { shouldPlay: true, isLooping: true }
        );
        soundObject = sound;
        setSound(sound);
        console.log("Playing Music");
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    playMusic();

    return () => {
      const fadeOutAndStop = async () => {
        if (soundObject) {
          try {
            console.log("Fading out music");
            const fadeDuration = 2000;
            const steps = 20;
            const interval = fadeDuration / steps;
            const volumeStep = 1 / steps;

            for (let i = 0; i < steps; i++) {
              const currentVolume = 1 - i * volumeStep;
              await soundObject.setVolumeAsync(currentVolume);
              await new Promise((resolve) => setTimeout(resolve, interval));
            }

            await soundObject.stopAsync();
            console.log("Music stopped");
          } catch (error) {
            console.error("Error fading out:", error);
          } finally {
            soundObject.unloadAsync();
          }
        }
      };

      fadeOutAndStop();
    };
  }, [song]);

  return (
    <View style={{flex: 1}}>
      {children}
    </View>
  );
};
