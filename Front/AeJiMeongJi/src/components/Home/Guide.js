import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../constants/styles';
import img1 from '../../Assets/image/banner1.jpg';
import img2 from '../../Assets/image/banner2.jpg';
import img3 from '../../Assets/image/banner3.jpg';
import img4 from '../../Assets/image/banner4.jpg';
import img5 from '../../Assets/image/banner5.jpg';
const imageArr = [img1, img2, img3, img4, img5];

const Guide = () => {
  const navigation = useNavigation();

  const random = Math.floor(Math.random() * 5 + 1);
  console.log(random);

  return (
    <View style={styles.box}>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.font, styles.font18, styles.line40]}>
          애견 가이드
        </Text>
      </View>

      <View style={styles.guideclickbox}>
        <TouchableOpacity
          onPress={() => {
            console.log('클릭');
            navigation.navigate('Guide');
          }}
          style={{width: responsiveWidth(80)}}>
          <Image
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(23),
              borderRadius: 20,
              marginTop: -10,
            }}
            resizeMode="contain"
            source={imageArr[Math.floor(Math.random() * 5)]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Guide;

const styles = StyleSheet.create({
  //글꼴
  font: {
    fontFamily: 'Cafe24Ssurround',
    letterSpacing: 4,
    color: Colors.contentText,
  },

  //글자 크기
  font10: {fontSize: responsiveFontSize(1)},
  font12: {fontSize: responsiveFontSize(1.3)},
  font14: {fontSize: responsiveFontSize(1.6)},
  font18: {fontSize: responsiveFontSize(1.99)},
  font20: {fontSize: responsiveFontSize(1.9999)},
  line20: {lineHeight: 20},
  line40: {lineHeight: 40},
  self: {
    alignSelf: 'center',
  },

  box: {
    alignSelf: 'center',
    width: responsiveWidth(80),
    marginTop: 0,
    marginBottom: responsiveHeight(20),
  },
  plus: {
    marginTop: 5,
    maxWidth: responsiveWidth(30),
    maxHeight: responsiveHeight(4),
    marginRight: responsiveWidth(-4),
  },

  guideclickbox: {
    height: responsiveHeight(23),
    alignSelf: 'center',
    backgroundColor: Colors.contentBox,
    width: responsiveWidth(80),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(5),
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
