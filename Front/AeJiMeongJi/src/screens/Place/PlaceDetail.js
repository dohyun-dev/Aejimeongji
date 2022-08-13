import React, {useEffect, useLayoutEffect, useState} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {View, Pressable, Text, Image, FlatList, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import {Colors} from '../../constants/styles';
import DetailInfo from '../../components/Place/DetailInfo';
import PlaceMap from '../../components/Place/PlaceMap';
import {searchPlace, fetchPlaceDetail, fetchReviews, fetchLiked} from '../../utils/place';
import Review from '../../components/Place/Review';
import {useNavigation} from '@react-navigation/native';

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

const PlaceDetail = ({route}) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [image, setImage] = useState();
  const [placeDetail, setPlaceDetail] = useState();
  const [infoImage, setInfoImage] = useState();
  const [reviews, setReviews] = useState();
  const [liked, setLiked] = useState();
  const navigation = useNavigation();

  const handleLiked = async () => {
    await fetchLiked(!liked, route.params.id)
    setLiked(cur => !cur);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        liked ? (
          <Pressable onPress={handleLiked}>
            <Image
              style={styles.heart}
              source={require('../../Assets/image/fill-heart.png')}
            />
          </Pressable>
        ) : (
          <Pressable onPress={handleLiked}>
            <Image
              style={styles.heart}
              source={require('../../Assets/image/empty-heart.png')}
            />
          </Pressable>
        ),
    });
  }, [liked]);

  useLayoutEffect(() => {
    const initialData = async () => {
      const res = await fetchPlaceDetail(route.params.id);
      setImage(res.petplaceImageUrl);
      setPlaceDetail(res);
      setInfoImage(res.petplaceInfoUrl);
      const reviewData = await fetchReviews(route.params.id);
      setReviews(reviewData);
    };

    const getLocation = async () => {
      const res = await searchPlace(route.params.address);
      setLatitude(+res.y);
      setLongitude(+res.x);
      // const res = await getAvatar();
    };
    initialData();
    getLocation();
  }, []);

  return (
    <ScrollView style={styles.rootContainer}>
      <Carousel
        sliderWidth={responsiveWidth(100)}
        sliderHeight={responsiveHeight(10)}
        itemWidth={responsiveWidth(55)}
        data={image}
        renderItem={renderItem}
        showSpinner={true}
        firstItem={3}
        hasParallaxImages={true}
      />
      <View style={styles.infoContainer}>
        <DetailInfo placeDetail={placeDetail} />
      </View>
      <View>
        {/* <FlatList
        key={'#'}
        data={CategoryDummy}
        renderItem={ReviewCarousel} /> */}
        {/* {infoImage && <ReviewCarousel infoImage={infoImage} />} */}
      </View>
      <View style={styles.mapContainer}>
        <PlaceMap latitude={latitude} longitude={longitude} />
      </View>
      <View style={styles.reviewContainer}>
        <FlatList key={'#'} data={reviews} renderItem={Review} numColumns={1} />
        {/* <Review /> */}
      </View>
    </ScrollView>
  );
};

export default PlaceDetail;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.back100,
  },
  item: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
  },
  infoContainer: {
    marginVertical: responsiveHeight(4),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  mapContainer: {},
  reviewContainer: {},
  heart: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
  },
});
