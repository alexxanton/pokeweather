import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

const CMusic = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let soundObject: Audio.Sound;

    const playMusic = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/music/dp_trainer.mp3"),
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
  }, []);

  return <View />;
};

export default CMusic;
