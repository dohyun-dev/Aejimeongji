import React from 'react';
import {Pressable, View, Button, StyleSheet, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';

const LikeButton = () => {
  const liked = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    };
  });

  return (
    <Pressable onPress={() => (liked.value = withSpring(liked.value ? 0 : 1))}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <Image
          style={styles.shareLogo}
          resizeMode="contain"
          source={require('../../Assets/image/empty-heart.png')}
          title="Calendar"
        />
      </Animated.View>
      <Animated.View style={fillStyle}>
        <Image
          style={styles.shareLogo}
          resizeMode="contain"
          source={require('../../Assets/image/fill-heart.png')}
          title="Calendar"
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shareLogo: {
    width: 40,
    height: 55,
  },
});

export default function GuideLike(props) {
  return (
    <View style={{}}>
      <LikeButton />
    </View>
  );
}
