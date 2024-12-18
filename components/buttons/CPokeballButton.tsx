import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { CButton } from './CButton';

import Pokeball from '@/assets/images/misc/Pokeball';
import { PressableProps } from 'react-native';


export function CPokeballButton({...rest}: PressableProps) {
  const xPos = useSharedValue(0);
  const yPos = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({}));

  const throwAnim = () => {};
  
  return(
    <>
      <Animated.View style={animStyle}>
        <CButton {...rest}>
          <Pokeball width={100} height={100} />
        </CButton>
      </Animated.View>
    </>
  );
}
