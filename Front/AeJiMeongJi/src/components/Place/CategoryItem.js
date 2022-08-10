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
const CategoryItem = ({source, title, rating, info}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    console.log('placeDetail');
    // navigation.navigate('PlaceDetail')
  };

  return (
    <View style={styles.rootContainer}>
      <Pressable onPress={goToDetail} style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </Pressable>
      <View style={styles.textContainer}>
        <Pressable onPress={goToDetail}>
          <Text style={styles.title}>{title}</Text>
        </Pressable>
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
        <View>
          <Text style={styles.info}>정보</Text>
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
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: '#643903',
    fontWeight: 'bold',
  },
  ratingContainer: {
    // marginRight: 190
  },
  info: {
    color: '#90560D',
  },
});
