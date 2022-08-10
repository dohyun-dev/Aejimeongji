import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  AppRegistry,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {Colors} from '../../constants/styles';
import haversine from 'haversine';
import Geolocation from 'react-native-geolocation-service';
import RunningTimer from '../../components/Running/RunningTimer';
import RunningAlert from '../../components/Running/RunningAlert';
import RunButton from '../../components/ui/RunButton';
import RunningHome from './RunningHome';

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class RunningGeolocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
  }
  // async componentDidMount() {
  //   /*LOCATION : */
  //   //Grant the permission for Location
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     {
  //       title: 'ReactNativeCode Location Permission',
  //       message: 'ReactNativeCode App needs access to your location ',
  //     },
  //   );

  //   if (granted) {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         console.log('My current location', JSON.stringify(position));
  //         this.setState({
  //           location:
  //             position.coords.latitude.toString() +
  //             ',' +
  //             position.coords.longitude.toString(),
  //         });
  //       },
  //       error => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );

  //     this.watchID = navigator.geolocation.watchPosition(lastPosition => {
  //       this.setState({lastPosition});
  //     });
  //   }
  //   //----LOCATION END----//
  // }

  componentDidMount() {
    const {coordinate} = this.state;
    if (this.props.coordinate) return;

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted && this.mounted) this.watchLocation();
      });
    } else {
      this.watchLocation();
    }

    this.watchID = Geolocation.watchPosition(
      position => {
        const {routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        coordinate.timing(newCoordinate).start();

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  //지도 위에 현재 위치
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  //haversine으로 거리 계산
  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          {/* 폴리라인 그리는 법 */}
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={3} />
          {/* 지도위에 마커 표시 */}
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        <View style={styles.info}>
          <RunningTimer></RunningTimer>
          <View style={styles.subContainer}>
            <View style={styles.distanceContainer}>
              <Text style={{fontSize: responsiveFontSize(2.2)}}>
                {parseFloat(this.state.distanceTravelled * 1000).toFixed(2)} m
              </Text>
              <Text>거리</Text>
            </View>

            <View style={styles.calorieContainer}>
              <Text style={{fontSize: responsiveFontSize(2.2)}}>
                {parseFloat((this.state.distanceTravelled / 0.1) * 7).toFixed(
                  2,
                )}
                kcal
              </Text>
              <Text>칼로리</Text>
            </View>
          </View>
          <RunningAlert></RunningAlert>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: responsiveWidth(80),
    paddingHorizontal: responsiveWidth(2),
    alignItems: 'center',
    marginHorizontal: responsiveWidth(2),
  },
  distanceContainer: {
    marginVertical: responsiveHeight(2.5),
    marginHorizontal: responsiveWidth(10),
    alignItems: 'center',
  },
  calorieContainer: {
    marginVertical: responsiveHeight(2.5),
    marginHorizontal: responsiveWidth(10),
    alignItems: 'center',
  },
  info: {
    backgroundColor: Colors.back100,
    width: responsiveWidth(100),
    height: responsiveHeight(29),
  },
});

export default RunningGeolocation;
