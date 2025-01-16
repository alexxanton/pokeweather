import { Audio } from 'expo-av';

export async function playSound(sound: Audio.Sound | undefined) {
    await sound?.playAsync();
    setTimeout(() => {
        sound?.stopAsync();
    }, 1000);
}
