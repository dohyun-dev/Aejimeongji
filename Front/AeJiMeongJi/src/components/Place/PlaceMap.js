import React from 'react';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const PlaceMap = ({latitude, longitude}) => {
  return (
    <>
      <MapView
        region={{
          latitude: latitude ? latitude : 36.1098478,
          longitude: longitude ? longitude : 128.4253594,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={{
            latitude: latitude ? latitude : 36.1098478,
            longitude: longitude ? longitude : 128.4253594,
          }}
        />
      </MapView>
    </>
  );
};

export default PlaceMap;

const styles = StyleSheet.create({
  map: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
});
