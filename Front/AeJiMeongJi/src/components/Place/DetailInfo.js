import React from 'react';
import {Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Rating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/styles';
const DetailInfo = ({title, rating}) => {
  return (
    <>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title ? title : '타이틀'}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            type="custom"
            defaultRating={rating}
            tintColor={Colors.back100}
            readonly
            ratingBackgroundColor={Colors.back200}
            imageSize={responsiveWidth(6)}
            style={styles.rating}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>주소 : 서울특별시 성동구 서울숲2길 28-11</Text>
          <Text style={styles.info}>전화번호 : 070-8868-2008</Text>
          <Text style={styles.info}>음식종류 : 카페/디저트</Text>
          <Text style={styles.info}>주차 : 주차공간 없음</Text>
          <Text style={styles.info}>영업시간 : 10:00 ~ 21:00</Text>
        </View>
      </View>
    </>
  );
};

export default DetailInfo;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.back100,
  },
  textContainer: {
    alignItems: 'center',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  titleContainer: {
    marginVertical: responsiveHeight(1)
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: '#643903',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: responsiveHeight(3)
  },
  info: {
    color: '#90560D',
    fontWeight: 'bold'
  },
});
