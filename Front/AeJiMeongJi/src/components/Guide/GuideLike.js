import React, {useState} from 'react';
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
import {getMemberId} from '../../utils/auth';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../utils/index';

const url = 'http://i7d203.p.ssafy.io:8080';

const LikeButton = props => {
  const liked = useSharedValue(0);
  const memberId = useSelector(state => state.auth.id);
  const dogId = useSelector(state => state.profile.id);
  // console.log(memberId);
  console.log(props.data);
  const submitHandler = () => {
    // if (content == '') {
    //   Alert.alert('내용을 입력해주세요');
    //   return;
    // }

    console.log('content');
    console.log(content);

    let data = {
      content: content,
      date: '2022-08-12',
      isActive: isHome,
      isAlert: isAlert,
    };

    axios
      .post(url + `/api/dog/${memberId}/guide/${guideId}/like`, data, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        if (response.status == 200) {
          console.log('To-Do 등록 성공');
          console.log(response);
        } else {
          console.log('To-Do 등록에 실패했습니다.');
        }
      });
  };

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
