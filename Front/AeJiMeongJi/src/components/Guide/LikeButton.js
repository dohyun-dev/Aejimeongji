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
import {isGuideLiked} from '../../utils/guide';

const url = 'http://i7d203.p.ssafy.io:8080';
console.log(new Date());
export default function GuideLike(props) {
  const LikeButton = () => {
    const [memberId, setmemberId] = useState([]);
    useLayoutEffect(() => {
      const member = async () => {
        const res = await getMemberId();
        if (res) {
          setmemberId(res);
          // 멤버 아이디로 좋아요 호출
          const isLiked = await isGuideLiked(res, props.data);
          isLiked
            ? (liked.value = withSpring(1))
            : (liked.value = withSpring(0));

          // liked.value = withSpring(isLiked)
        }
      };
      member();
    }, []);
    const guideId = props.data;
    console.log(guideId, memberId);
    const liked = useSharedValue(0);

    const submitLike = async () => {
      let method = 'delete';
      if (liked.value === 0) {
        // submit
        method = 'post';
      }

      liked.value = withSpring(liked.value ? 0 : 1);

      try {
        const res = await axios({
          method: method,
          url: url + `/api/member/${memberId}/guide/${guideId}/like`,
        });
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error.response, 'issue');
      }
    };

    const deleteLike = async () => {
      try {
        const res = await axios({
          method: 'delete',
          url: url + `/api/member/${memberId}/guide/${guideId}/like`,
        });
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error.response, 'issue');
      }
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
      <Pressable onPress={submitLike}>
        {/* <TouchableOpacity onPress={submitLike}> */}
        <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
          <Image
            style={styles.shareLogo}
            resizeMode="contain"
            source={require('../../Assets/image/empty-heart.png')}
            title="Calendar"
          />
        </Animated.View>
        {/* </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={deleteLike}> */}
        <Animated.View style={fillStyle}>
          <Image
            style={styles.shareLogo}
            resizeMode="contain"
            source={require('../../Assets/image/fill-heart.png')}
            title="Calendar"
          />
        </Animated.View>
        {/* </TouchableOpacity> */}
      </Pressable>
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
