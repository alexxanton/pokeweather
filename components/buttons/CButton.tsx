import { Pressable, Vibration } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { type ComponentProps } from "react";
import { useData } from "../CDataProvider";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

type Props = Omit<ComponentProps<typeof Pressable>, 'onPressIn' | 'onPressOut'> & { href?: string, replace?: boolean };

export function CButton({ href, replace, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { buttonActive, setButtonActive, userId } = useData();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (href) {
      if (buttonActive) {
        if (!userId && pathname !== "/profile") {
          router.push("/(tabs)/profile");
        } else {
          if (replace) {
            router.replace(href);
          } else {
            router.push(href);
          }
        }
      }
      
      setButtonActive(false);
      setTimeout(() => {
        setButtonActive(true);
      }, 500);
    }
  };

  const scaleGrow = () => {
    Vibration.vibrate(100);
    scale.value = withTiming(1.1, { duration: 200 });
  };

  const scaleShrink = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={scaleGrow}
        onPressOut={scaleShrink}
        {...rest}
      />
    </Animated.View>
  );
}
