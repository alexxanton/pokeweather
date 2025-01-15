import React, { useEffect, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { Audio } from 'expo-av';
import { randint } from '@/utils/randint';
import { battleMusicMap } from '@/utils/battleFunctions/musicMap';
import { useData } from './CDataProvider';

type RandomKey = keyof typeof battleMusicMap;

export function CMusic({ children }: ViewProps) {
  const [playingSounds, setPlayingSounds] = useState<Audio.Sound[]>([]);
  const [preloadedSounds, setPreloadedSounds] = useState<{ [key: string]: Audio.Sound }>({});
  const adSong = require("@/assets/music/ad_song.mp3");
  const { song } = useData();

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
      sounds["ad_song"] = adSound;

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
  }, []);

  useEffect(() => {
    const playMusic = async () => {
      try {
        // Stop and unload all currently playing sounds
        await stopAllSounds();

        const keys = Object.keys(battleMusicMap);
        const randomKey = keys[randint(0, keys.length)] as RandomKey;
        const source = song === "battle" ? battleMusicMap[randomKey] : adSong;

        console.log("Loading Music:", source);
        const { sound } = await Audio.Sound.createAsync(source, {
          shouldPlay: true,
          isLooping: true,
        });

        sound.setVolumeAsync(0.2);
        setPlayingSounds((prevSounds) => [...prevSounds, sound]);
        console.log("Playing Music");
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    };

    if (song) {
      playMusic();
    }

    stopAllSounds();
  }, [song]);

  const stopAllSounds = async () => {
    try {
      for (const sound of playingSounds) {
        await fadeOutAndStop(sound);
        await sound.unloadAsync();
      }
      setPlayingSounds([]);
      console.log("All sounds stopped and unloaded");
    } catch (error) {
      console.error("Error stopping sounds:", error);
    }
  };

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
