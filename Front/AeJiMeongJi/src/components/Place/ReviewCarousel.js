import React from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {reviewData} from './Review';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';

const DummyData = [
  {
    id: 1,
    source:
      'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg',
  },
  {
    id: 2,
    source:
      'https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg',
  },
  {
    id: 3,
    source:
      'https://cdn.pixabay.com/photo/2013/04/11/19/46/building-102840__340.jpg',
  },
  {
    id: 4,
    source:
      'https://cdn.pixabay.com/photo/2015/11/17/18/59/architecture-1048092__340.jpg',
  },
  {
    id: 5,
    source:
      'https://cdn.pixabay.com/photo/2017/03/05/00/34/panorama-2117310__340.jpg',
  },
  {
    id: 6,
    source:
      'https://cdn.pixabay.com/photo/2017/10/17/19/11/fantasy-2861815__340.jpg',
  },
  {
    id: 7,
    source:
      'https://cdn.pixabay.com/photo/2016/09/19/22/46/lake-1681485__340.jpg',
  },
];

const renderItem = ({item, index}, parallaxProps) => {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{uri: item}}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    </View>
  );
};

const ReviewCarousel = ({infoImage}) => {
  return (
    <View>
      <Carousel
        sliderWidth={responsiveWidth(100)}
        sliderHeight={responsiveHeight(100)}
        itemWidth={responsiveWidth(100)}
        data={infoImage}
        renderItem={renderItem}
        hasParallaxImages={true}
        showSpinner={true}
        firstItem={0}
      />
    </View>
  );
};

export default ReviewCarousel;

const styles = StyleSheet.create({
  item: {
    width: responsiveWidth(100),
    height: responsiveWidth(80),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
