import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Colors} from '../../constants/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {fetchPlace} from '../../utils/place';

const CarouselItem = ({category, lat, lng}) => {
  const navigation = useNavigation();

  const renderItem = ({item, index}, parallaxProps) => {
    const goToDetail = () => {
      const {id, address} = item;
      navigation.navigate('PlaceDetail', {id, address});
    };
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.petplaceThumbnail}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Pressable style={styles.infoContainer} onPress={goToDetail}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.distance}>
            {Math.floor(item.distance / 1000)} km
          </Text>
        </Pressable>
      </View>
    );
  };

  const [placeData, setPlaceData] = useState();
  const [loadMoreData, setLoadMoreData] = useState();

  const goToCategory = () => {
    navigation.navigate('PlaceCategory', {
      category,
      placeData,
      loadMoreData,
      lat,
      lng,
    });
  };

  useLayoutEffect(() => {
    const initialData = async () => {
      const res = await fetchPlace(category, lat, lng);
      const loadMore = {curLastIdx: res.curLastIdx, hasNext: res.hasNext};
      setPlaceData(res.data);
      setLoadMoreData(loadMore);
    };
    initialData();
  }, []);

  return (
    <>
      {placeData?.length !== 0 && (
        <View style={styles.rootContainer}>
          <View style={styles.textContainer}>
            <View style={styles.categoryText}>
              <Text style={styles.CartegoryTitle}>
                반려견과 함께 방문할 {category}
              </Text>
            </View>
            <Pressable style={styles.detail} onPress={goToCategory}>
              <Text style={styles.detailText}>전체보기</Text>
            </Pressable>
          </View>
          <Carousel
            sliderWidth={responsiveWidth(100)}
            sliderHeight={responsiveHeight(50)}
            itemWidth={responsiveWidth(33)}
            data={placeData}
            renderItem={renderItem}
            hasParallaxImages={true}
            showSpinner={true}
            firstItem={1}
          />
        </View>
      )}
    </>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.back100,
    paddingVertical: responsiveHeight(2),
    marginVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(5),
  },
  textContainer: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-between',
    marginHorizontal: responsiveWidth(5),
  },
  CartegoryTitle: {
    color: 'black',
    // fontWeight: 'bold',
    fontFamily: '강원교육튼튼',
    fontSize: responsiveFontSize(2),
  },
  detailText: {
    color: '#90560D',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'IBMPlexSansKR-Regular',
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
    fontFamily: 'IBMPlexSansKR-Regular',
  },
  title: {
    fontFamily: 'IBMPlexSansKR-Regular',
  },
});
