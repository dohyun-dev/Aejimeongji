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
const DetailInfo = ({placeDetail}) => {
  return (
    <>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{placeDetail?.name ? placeDetail.name : '타이틀'}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Rating
            type="custom"
            startingValue={placeDetail?.rating}
            tintColor={Colors.back100}
            readonly
            ratingBackgroundColor={Colors.back200}
            imageSize={responsiveWidth(6)}
            style={styles.rating}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>주소 : {placeDetail?.address}</Text>
          <Text style={styles.info}>전화번호 : {placeDetail?.tel}</Text>
          <Text style={styles.info} numberOfLines={2}>{placeDetail?.description}</Text>
          <Text numberOfLines={1} style={styles.info}>{placeDetail?.openingHours}</Text>
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
    width: responsiveWidth(80),
    marginLeft: responsiveWidth(10)

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
