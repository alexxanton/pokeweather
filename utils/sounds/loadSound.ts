import { Audio } from 'expo-av';

export async function loadSound(setSound: React.Dispatch<React.SetStateAction<{pokeball?: Audio.Sound, throw?: Audio.Sound, wobble?: Audio.Sound, escape?: Audio.Sound}>>, key: string, source: any) {
    const { sound } = await Audio.Sound.createAsync(source);

    await sound.setVolumeAsync(1);
    setSound(prev => ({ ...prev, [key]: sound }));
}
