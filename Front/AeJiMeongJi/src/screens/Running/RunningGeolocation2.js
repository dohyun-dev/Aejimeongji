import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import MapView, {
  AnimatedRegion,
  Circle,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Avatar} from '@rneui/base/dist/Avatar';
import {hasPermission} from '../../utils/running';
import haversine from 'haversine';

const RunningGeolocation2 = () => {
  const interval = useRef(null);
  const watchId = useRef(null);

  // States:
  // 1. For metric value
  const [metricValue, setMetricValue] = useState('1.0');
  // 2. Toggling
  const [Toggle, setToggle] = useState('Distance');
  // 3. Metric Unit
  const [MetricUnit, setMetricUnit] = useState('Kilometers');
  const [position, setPosition] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState();
  const [addNum, setAddNum] = useState(0.01);
  const [prevLatLng, setPrevLatLng] = useState({});
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [inFocus, setInFocus] = useState(true);
  const [initial, setInitial] = useState();
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }),
  );

  const navigation = useNavigation();
  const getLocationUpdates = async () => {
    const locationPermission = await hasPermission();

    if (!locationPermission) {
      return;
    }

    watchId.current = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude: latitude,
          longitude: longitude,
        };
        coordinate.timing(newCoordinate).start();
        console.log(newCoordinate);
        setPosition({latitude, longitude});
        setRouteCoordinates(cur => cur.concat([newCoordinate]));
        setPrevLatLng(newCoordinate);
        const newDistanceTravelled =
          distanceTravelled + calcDistance(newCoordinate);
        setDistanceTravelled(newDistanceTravelled);
      },
      error => {
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        timeout: 20000,
        distanceFilter: 10,
        interval: 1000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
      },
    );
  };

  const calcDistance = newLatLng => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  // function to remove location updates api
  // const removeLocationUpdates = useCallback(() => {
  //   if (watchId.current !== null) {
  //     Geolocation.clearWatch(watchId.current);
  //     watchId.current = null;
  //   }
  // });

  // get current location
  const getLocation = async () => {
    const locationPermission = await hasPermission();
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position.coords, '초기값');
          setInitial(position.coords);
        },
        error => {
          setPosition(null);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
          },
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
          forceRequestLocation: true,
          forceLocationManager: false,
          showLocationDialog: true,
        },
      );
    }
  };

  // Helper function to make changes to the text input
  const changeMetricValueHandler = input => {
    if (validateInput(input, Toggle)) {
      if (input[0] == '.' || input[0] == ':') {
        input = '0' + input;
      }
      if (input[input.length - 1] == '.' || input[input.length - 1] == ':') {
        input = input + '0';
      }
      setMetricValue(input);
    }
  };

  useEffect(() => {
    getLocation();
    getLocationUpdates();
  }, []);

  useEffect(() => {
    getLocationUpdates();
  }, [position]);

  useEffect(() => {
    navigation.addListener('beforeRemove', backButtonCallback);
    return () => navigation.removeListener('beforeRemove', backButtonCallback);
  }, [navigation]);

  // useEffect triggered whenever the screen is in focus
  useEffect(() => {
    navigation.addListener('focus', event => {
      // setInFocus(true);
      getLocationUpdates();
    });
  }, [navigation]);

  // useEffect triggered whenever the screen is out of focus
  // useEffect(() => {
  //   navigation.addListener('blur', event => {
  //     removeLocationUpdates();
  //   });
  // }, [navigation]);
  const backButtonCallback = useCallback(
    event => {
      // prevent default behavior
      event.preventDefault();

      // Alert to confirm his action
      Alert.alert(
        'Discarding Run',
        'Are you sure you want to discard this run?',
        [
          {text: 'No', style: 'cancel', onPress: () => {}},
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => navigation.dispatch(event.data.action),
          },
        ],
      );
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.container} pointerEvents="none">
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: position?.latitude || 36.78825,
            longitude: position?.longitude || 126.123,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          minZoomLevel={18}
          showUserLocation
          followUserLocation
          loadingEnabled
          style={{flex: 1, opacity: 0.6}}>
          <Polyline coordinates={routeCoordinates} strokeWidth={3} />
          <Marker.Animated
            ref={marker => {
              marker;
            }}
            coordinate={coordinate}
          />
          {/* <Circle
            center={{
              latitude: initial?.latitude || 37.78825,
              longitude: initial?.longitude || -122.4324,
            }}
            radius={4}
            fillColor="red"
          /> */}
          {/* <Button
            title="넘기기"
            onPress={() => {
              navigation.navigate('RunningFinish', distanceTravelled);
            }}></Button> */}
        </MapView>
      </View>
    </View>
  );
};
``;

const colors = {
  // Home Screen
  tabsColor: '#040404',
  startButton: '#fe9836',
  metricError: 'red',
  toggleButtonBorder: '#ccc',
  toggleButtonBackground: '#fff',
  avatarTitle: '#000',

  // Navigation
  summaryHeader: '#f7f7f7',

  // Activity Screen
  cardBackground: '#ffffff',
  cardHeading: '#070707',
  cardSubHeading: '#777777',
  cardMetric: '#8d8d8d',

  // Summary Screen
  summaryBackgroundColor: '#fff',
  summaryBorder: '#ccc',
  summarySubheading: '#aaaaaa',
  summaryMetric: '#999999',
  summaryProgressBarBorder: '#ccc',
  summaryProgressBarContainerBackground: '#fff',
};

const styles = StyleSheet.create({
  container: {height: '100%', width: '100%'},
  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  toggleContainer: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 28,
    borderColor: colors.toggleButtonBorder,
    marginTop: 28,
    backgroundColor: colors.toggleButtonBackground,
  },
  toggleTitle: {fontSize: 16, fontWeight: 'bold'},
  metricValue: {
    fontSize: 52,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    marginBottom: 4,
    alignSelf: 'center',
    flexShrink: 1,
    color: '#000',
  },
  metricUnit: {alignSelf: 'center', fontSize: 18, fontWeight: 'bold'},
  bottomContainer: {justifyContent: 'space-between', alignItems: 'center'},
  avatarTitle: {fontSize: 28, color: colors.avatarTitle, fontWeight: 'bold'},
  avatarContainer: {backgroundColor: colors.startButton},
});

export default RunningGeolocation2;
