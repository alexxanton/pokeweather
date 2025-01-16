import { Audio } from 'expo-av';

export async function loadSound(setSound: React.Dispatch<React.SetStateAction<any>>, source: any) {
    const { sound } = await Audio.Sound.createAsync(source);

    await sound.setVolumeAsync(1);
    setSound(sound);
}
