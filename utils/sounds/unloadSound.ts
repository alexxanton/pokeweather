import { Audio } from 'expo-av';

export async function unloadSound(sound: Audio.Sound | undefined) {
    sound?.unloadAsync();
}
