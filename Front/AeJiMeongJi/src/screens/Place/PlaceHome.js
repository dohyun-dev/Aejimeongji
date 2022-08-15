import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import CarouselItem from '../../components/Place/CarouselItem';
import DogInfo from '../../components/Place/DogInfo';
import {Colors} from '../../constants/styles';
import PlaceNavbar from '../../components/nav/PlaceNavbar';
import {useSelector} from 'react-redux';
import {getDog} from '../../utils/profile';
import Geolocation from 'react-native-geolocation-service';
import CarouselList from '../../components/Place/CarouselList';
import {fetchPlace} from '../../utils/place';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const PlaceHome = () => {
  const dogId = useSelector(state => state.profile.id);
  const [source, setSource] = useState();
  const [dogInfo, setDogInfo] = useState();
  const [location, setLocation] = useState();
  const [placeData, setPlaceData] = useState();

  useEffect(() => {
    const InitialData = async () => {
      const res = await getDog(dogId);
      setSource(`http://i7d203.p.ssafy.io:8080/api/image/${res.imageName}`);
      setDogInfo(res);
    };

    const requestPermission = async () => {
      // ios
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
      // 안드로이드 위치 정보 수집 권한 요청
      if (Platform.OS === 'android') {
        const res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (res === 'granted') {
          Geolocation.getCurrentPosition(pos => {
            // api 호출
            // const res = await 호출()
            console.log(pos.coords);
            setLocation(pos.coords);
          });
        }
      }
    };
    requestPermission();
    InitialData();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <PlaceNavbar source={source}>플레이스</PlaceNavbar>
      <ScrollView>
        <View>
          <DogInfo source={source} dogInfo={dogInfo} />
        </View>
        <View>
          {location && (
            <CarouselList lat={location?.latitude} lng={location?.longitude} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceHome;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: Colors.back100,
    backgroundColor: '#FBEDD3',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
