import React, {useState, useLayoutEffect} from 'react';
import {
  Pressable,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
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

export default function GuideLike(props) {
  const LikeButton = () => {
    const [memberId, setmemberId] = useState([]);
    useLayoutEffect(() => {
      const member = async () => {
        const res = await getMemberId();
        if (res) {
          setmemberId(res);
        }
      };
      member();
    }, []);
    const guideId = props.data;
    console.log(guideId, memberId);

    const submitLike = async () => {
      try {
        const res = await axios({
          method: 'post',
          url: url + `/api/member/${memberId}/guide/${guideId}/like`,
        });
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error.response, 'issue');
      }
    };
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
      // <Pressable
      //   onPress={() => (liked.value = withSpring(liked.value ? 0 : 1))}>
      //   <TouchableOpacity onPress={submitLike}>
      //   <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
      <View>
        <TouchableOpacity onPress={submitLike}>
          <Image
            style={styles.shareLogo}
            resizeMode="contain"
            source={require('../../Assets/image/empty-heart.png')}
            title="Calendar"
          />
        </TouchableOpacity>

        {/* // </Animated.View> */}
        {/* // </TouchableOpacity> */}
        {/* <Animated.View style={fillStyle}> */}
        <TouchableOpacity>
          <Image
            style={styles.shareLogo}
            resizeMode="contain"
            source={require('../../Assets/image/fill-heart.png')}
            title="Calendar"
          />
        </TouchableOpacity>
        {/* </Animated.View> */}
      </View>
      // </Pressable>
    );
  };
  return (
    <View style={{}}>
      <LikeButton />
    </View>
  );
}
const styles = StyleSheet.create({
  shareLogo: {
    width: 40,
    height: 55,
  },
});
