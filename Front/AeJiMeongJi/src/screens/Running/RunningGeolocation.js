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
import {useNavigation} from '@react-navigation/native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {Colors} from '../../constants/styles';
import haversine from 'haversine';
import Geolocation from 'react-native-geolocation-service';
// import RunningTimer from '../../components/Running/RunningTimer';
import RunningAlert from '../../components/Running/RunningAlert';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import RunButton from '../../components/ui/RunButton';
import RunningHome from './RunningHome';
import RunningFinish from './RunningFinish';

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const isStopwatchStart = true;
const resetStopwatch = false;

class RunningGeolocation extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      start: true,
      pause: resetStopwatch,
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
      currentTime: 0,
    };
  }
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

  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
    console.log(this.state.currentTime);
    console.log('산책 끝!dd');
  };
  getFormattedTime(time) {
    this.currentTime = time;
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
          <View style={styles.timeContainer}>
            <View style={styles.timeSectionStyle}>
              <Stopwatch
                laps
                secs
                start={this.state.start}
                options={options}
                reset={resetStopwatch}></Stopwatch>
            </View>
          </View>
          <View style={styles.subContainer}>
            <View style={styles.distanceContainer}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontFamily: 'IBMPlexSansKR-Regular',
                }}>
                {parseFloat(this.state.distanceTravelled * 1000).toFixed(2)} m
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: 'IBMPlexSansKR-Regular',
                }}>
                거리
              </Text>
            </View>

            <View style={styles.calorieContainer}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontFamily: 'IBMPlexSansKR-Regular',
                }}>
                {parseFloat((this.state.distanceTravelled / 0.1) * 7).toFixed(
                  2,
                )}
                kcal
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  fontFamily: 'IBMPlexSansKR-Regular',
                }}>
                칼로리
              </Text>
            </View>
          </View>
          <RunningAlert data={this.state.distanceTravelled}></RunningAlert>
          {/* <TouchableHighlight
            onPress={() => this.setState({start: !this.state.start})}>
            <Text style={styles.buttonText}>
              {!this.state.start ? '재시작' : '일시정지'}
            </Text>
          </TouchableHighlight> */}
          <View>
            <RunButton onPress={() => {}}>정지</RunButton>
            <RunButton
              title={'3-Button Alert'}
              data={this.state.distanceTravelled}
              onPress={() => {
                this.setState({start: !this.state.start});
                this.props.navigation.navigate(RunningAlert);
              }}>
              산책종료
            </RunButton>
          </View>
          {/* <RunningAlert data={this.componentWillUnmount}></RunningAlert> */}
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
    marginVertical: responsiveHeight(1.3),
    marginHorizontal: responsiveWidth(10),
    alignItems: 'center',
  },
  calorieContainer: {
    marginVertical: responsiveHeight(1.3),
    marginHorizontal: responsiveWidth(10),
    alignItems: 'center',
  },
  info: {
    backgroundColor: Colors.back100,
    width: responsiveWidth(100),
    height: responsiveHeight(29),
  },
  timeContainer: {
    padding: responsiveHeight(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSectionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: responsiveFontSize(2.2),
    marginTop: responsiveHeight(1),
  },
});

const options = {
  container: {
    padding: responsiveWidth(2),
    borderRadius: 5,
    width: responsiveWidth(50),
    alignItems: 'center',
  },
  text: {
    fontSize: responsiveFontSize(3.4),
    fontFamily: '강원교육튼튼',
    color: '#000000',
    marginLeft: responsiveWidth(2),
  },
};

export default RunningGeolocation;
