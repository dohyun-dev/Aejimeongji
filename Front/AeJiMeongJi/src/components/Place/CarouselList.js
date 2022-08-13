import React from 'react';
import {View} from 'react-native';
import CarouselItem from './CarouselItem';

const CarouselList = ({lat, lng}) => {
  return (
    <>
      <View>
        <CarouselItem category={'음식점'} lat={lat} lng={lng} />
      </View>
      <View>
        <CarouselItem category={'관광지'} lat={lat} lng={lng} />
      </View>
      <View>
        <CarouselItem category={'숙소'} lat={lat} lng={lng} />
      </View>
      <View>
        <CarouselItem category={'캠핑'} lat={lat} lng={lng} />
      </View>
      <View>
        <CarouselItem category={'쇼핑'} lat={lat} lng={lng} />
      </View>
      <View>
        <CarouselItem category={'호텔링'} lat={lat} lng={lng} />
      </View>
    </>
  );
};

export default CarouselList;
