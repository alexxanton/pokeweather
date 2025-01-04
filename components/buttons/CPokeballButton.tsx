import React, { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, withSpring, withSequence } from 'react-native-reanimated';
import { CButton } from './CButton';
import { type PressableProps } from 'react-native';

import Pokeball from '@/assets/images/misc/Pokeball';

type CPokeballButtonProps = PressableProps & {
  onThrow: () => void,
  wobble: number,
  canThrow: boolean
};


export function CPokeballButton({onThrow, wobble, canThrow, ...rest}: CPokeballButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const xPos = useSharedValue(0);
  const yPos = useSharedValue(0);
  const rotation = useSharedValue(0);
  const wobbleRotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPos.value },
      { translateY: yPos.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
      { rotate: `${wobbleRotation.value}deg` }
    ]
  }));

  const throwAnim = () => {
    if (isPressed || !canThrow) return;
    setIsPressed(true);
    
    xPos.value = 0;
    yPos.value = 0;
    scale.value = 1;

    // throw pokeball
    scale.value = withTiming(0.5, { duration: 500 });
    rotation.value = withTiming(360, { duration: 800 });
    xPos.value = withTiming(70, { duration: 1000 });
    yPos.value = withTiming(-600, { duration: 400 }, () => {
      // fall back
      yPos.value = withTiming(-500, { duration: 200 }, () => {
        // hit pokemon
        rotation.value = withTiming(-360 * 2, { duration: 1000 });
        xPos.value = withTiming(0, { duration: 200 });
        yPos.value = withTiming(-550, { duration: 200 }, () => {
          // get pokemon inside ball
          xPos.value = withDelay(700, withTiming(70, { duration: 400 }));
          yPos.value = withDelay(700, withTiming(-400, { duration: 400 }));
          scale.value = withDelay(400, withTiming(0.7, { duration: 200 }, () => {
            scale.value = withTiming(0.5, { duration: 200 });
          }));
        });
      });
    });

    onThrow();
  };

  const wobbleAnim = () => {
    wobbleRotation.value = 0;
    wobbleRotation.value = withSequence(
      withTiming(15, { duration: 100 }),
      withTiming(-15, { duration: 100 }),
      withTiming(10, { duration: 80 }),
      withTiming(-10, { duration: 80 }),
      withTiming(5, { duration: 60 }),
      withTiming(-5, { duration: 60 }),
      withTiming(0, { duration: 50 })
    );
  };

  const catchFailedAnim = () => {
    rotation.value = withTiming(-3600, { duration: 1000 });
    xPos.value = withTiming(0, { duration: 1000 });
    yPos.value = withTiming(-550, { duration: 400 }, () => {
      yPos.value = withTiming(0, { duration: 500 }, () => {
        scale.value = withTiming(1);
      });
    });

    setTimeout(() => {
      setIsPressed(false);
    }, 900);
  };

  const catchSucceedAnim = () => {
    setTimeout(() => {
      setIsPressed(false);
    }, 900);
  };

  useEffect(() => {
    if (wobble > 0 && wobble < 4) {
      wobbleAnim();
    } else if (wobble == 4) {
      catchSucceedAnim();
    } else if (wobble == -1) {
      catchFailedAnim();
    }
  }, [wobble]);
  
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
