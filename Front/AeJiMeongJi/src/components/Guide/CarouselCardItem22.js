import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {useSelector} from 'react-redux';
import {getMemberId} from '../../utils/auth';
import {useNavigation} from '@react-navigation/native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const imageurl = 'http://i7d203.p.ssafy.io:8080/api/image/';

const CarouselCardItem22 = ({item, index}) => {
  const guideId = item.guideId;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GuideDetail', {guideId});
      }}>
      <View style={styles.container} key={index}>
        <Image
          source={
            item.thumbnail
              ? {uri: `${imageurl}${item.thumbnail}`}
              : item.sources
          }
          style={styles.image}
        />
        <Text style={styles.header}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.back200,
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
  },
  header: {
    color: '#222',
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 10,
  },
});

export default CarouselCardItem22;
