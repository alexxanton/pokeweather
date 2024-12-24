import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, withSpring, withSequence } from 'react-native-reanimated';
import { CButton } from './CButton';
import { type PressableProps } from 'react-native';

import Pokeball from '@/assets/images/misc/Pokeball';

type CPokeballButtonProps = PressableProps & {
  onThrow: () => void;
};


export function CPokeballButton({onThrow, ...rest}: CPokeballButtonProps) {
  const xPos = useSharedValue(0);
  const yPos = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPos.value },
      { translateY: yPos.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ]
  }));

  const throwAnim = () => {
    xPos.value = 0;
    yPos.value = 0;
    scale.value = 1;

    scale.value = withTiming(0.5, { duration: 700 });

    rotation.value = withTiming(360, { duration: 1000 }, () => {
      // rotation.value = 0;
    });

    yPos.value = withTiming(-600, { duration: 700 }, () => {
      yPos.value = withTiming(-500, { duration: 500 }, () => {
        rotation.value = withTiming(-360 * 3, { duration: 2000 });
        xPos.value = withTiming(0, { duration: 700 });
        yPos.value = withTiming(-550, { duration: 700 }, () => {
          scale.value = withDelay(900, withTiming(0.7, { duration: 200 }, () => {
            scale.value = withTiming(0.5, { duration: 200 });
          }));
          xPos.value = withDelay(1000, withTiming(70, { duration: 700 }));
          yPos.value = withDelay(1000, withTiming(-400, { duration: 700 }));
        });
      });
      
      // xPos.value = withTiming(-50, { duration: 500 }, () => {
      //   scale.value = 1;
      // });
    });

    xPos.value = withTiming(70, { duration: 1200 }, () => {
      
    });

    onThrow();
  };

  const wobbleAnim = () => {};
  
  return(
    <>
      <Animated.View style={animStyle}>
        <CButton {...rest} onPress={throwAnim}>
          <Pokeball width={100} height={100} />
        </CButton>
      </Animated.View>
    </>
  );
}
