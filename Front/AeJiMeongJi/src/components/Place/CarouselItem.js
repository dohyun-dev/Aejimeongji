import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Colors} from '../../constants/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const DummyData = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];

const renderItem = ({item, index}, parallaxProps) => {
    const goToDetail = () => {
        console.log('title 클릭');
    }
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{uri: item.illustration}}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      <Pressable onPress={goToDetail}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </Pressable>
    </View>
  );
};

const CarouselItem = ({category}) => {
  const navigation = useNavigation();
  const goToCategory = () => {
    navigation.navigate('PlaceCategory', category)
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <View style={styles.categoryText}>
          <Text style={styles.CartegoryTitle}>반려견과 함께 방문할 맛집</Text>
        </View>
        <Pressable style={styles.detail} onPress={goToCategory}>
          <Text style={styles.detailText}>전체보기</Text>
        </Pressable>
      </View>
      <Carousel
        sliderWidth={responsiveWidth(100)}
        sliderHeight={responsiveHeight(50)}
        itemWidth={responsiveWidth(33)}
        data={DummyData}
        renderItem={renderItem}
        hasParallaxImages={true}
        showSpinner={true}
        firstItem={1}
      />
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.back100,
    paddingVertical: responsiveHeight(4),
    marginVertical: responsiveHeight(1),
  },
  textContainer: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-between',
    marginHorizontal: responsiveWidth(5),
  },
  CartegoryTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  detailText: {
    color: '#90560D',
    fontSize: responsiveFontSize(1.5),
  },
  item: {
    width: responsiveWidth(30),
    height: responsiveHeight(20),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: responsiveWidth(4),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
