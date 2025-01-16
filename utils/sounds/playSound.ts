import { Audio } from 'expo-av';

export async function playSound(sound: Audio.Sound | undefined) {
    await sound?.stopAsync(); // Stop to ensure it gets played
    await sound?.playAsync();
}
