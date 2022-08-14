import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Image, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {Button as Btn} from '@rneui/themed';

const CategoryItem = ({source, title, rating, info, id, address}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    // console.log('placeDetail');
    navigation.navigate('PlaceDetail', {id, address});
  };

  return (
    <View style={styles.rootContainer}>
      <Pressable onPress={goToDetail} style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </Pressable>
      <View style={styles.textContainer}>
        <Pressable onPress={goToDetail}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </Pressable>
        <View style={styles.ratingContainer}>
          <Rating
            type="custom"
            startingValue={rating}
            tintColor={Colors.back100}
            readonly
            ratingBackgroundColor={Colors.back200}
            imageSize={responsiveWidth(6)}
            style={styles.rating}
          />
        </View>
        <View>
          <Text ellipsizeMode="tail" numberOfLines={3} style={styles.info}>
            {info}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Btn
            title={'더보기'}
            onPress={goToDetail}
            buttonStyle={{backgroundColor: Colors.back100}}
            titleStyle={styles.btn}></Btn>
        </View>
      </View>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveWidth(8),
  },
  imageContainer: {},
  image: {
    width: 140,
    height: 165,
    borderRadius: 10,
  },
  textContainer: {
    marginHorizontal: responsiveWidth(8),
    width: responsiveWidth(30),
    marginTop: responsiveHeight(1)
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: '#643903',
    // fontWeight: 'bold',
    fontFamily: '강원교육튼튼',
  },
  ratingContainer: {
    marginTop: responsiveHeight(1.5),
  },
  info: {
    color: '#90560D',
    fontFamily: 'IBMPlexSansKR-Regular',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btn: {
    color: '#90560D',
    fontSize: responsiveFontSize(1.3),
    justifyContent: 'flex-end',
    fontFamily: 'IBMPlexSansKR-Regular',
  },
});
