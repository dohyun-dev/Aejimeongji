import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Colors} from '../../constants/styles';

const MyPageLiked = ({data, screen}) => {
  const navigation = useNavigation();
  const imageurl = 'http://i7d203.p.ssafy.io:8080/api/image/';

  const renderItem = ({item, index}, parallaxProps) => {
    console.log(item.thumbnail);
    const goToScreen = () => {
      console.log('title 클릭');
      const {id, address} = item;
      console.log(id, address);
      navigation.navigate(screen, {id, address});
    };
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: screen === 'PlaceDetail' ? item.petplaceThumbnail : `${imageurl}${item.thumbnail}`}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Pressable style={styles.infoContainer} onPress={goToScreen}>
          <Text style={styles.title} numberOfLines={1}>
            {screen === 'PlaceDetail' ? item.name : item.title}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <Carousel
        sliderWidth={responsiveWidth(100)}
        sliderHeight={responsiveHeight(50)}
        itemWidth={responsiveWidth(33)}
        data={data}
        renderItem={renderItem}
        hasParallaxImages={true}
        showSpinner={true}
        firstItem={1}
      />
    </>
  );
};

export default MyPageLiked;

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
    fontSize: responsiveFontSize(1.8),
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
  categoryText: {
    marginBottom: responsiveHeight(2),
  },
  distance: {
    fontSize: responsiveFontSize(1.5),
  },
});
