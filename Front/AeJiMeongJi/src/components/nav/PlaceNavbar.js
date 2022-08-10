import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/styles';

const PlaceNavbar = ({source}) => {
  return (
    <View style={styles.nav}>
      <Image
        style={styles.profilelogo}
        resizeMode="contain"
        source={{uri: source}}
      />
      <View style={styles.text}>
        <Text>플레이스</Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('CalendarHome');
        }}
        style={styles.calendarContainer}>
        <Image
          style={styles.calendarLogo}
          resizeMode="contain"
          source={require('../../Assets/image/calendarLogo.png')}
          title="Calendar"
        />
      </Pressable>
    </View>
  );
};

export default PlaceNavbar;

const styles = StyleSheet.create({
  //글꼴
  font: {
    fontFamily: 'ONE Mobile POP',
    letterSpacing: 4,
    color: Colors.contentText,
  },
  contentFont: {
    fontFamily: 'ONE Mobile Regular',
    fontWeight: 'bold',
  },
  nav: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  contentbox: {
    flex: 14,
    justifyContent: 'center',
    backgroundColor: Colors.back100,
  },
  profilelogo: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(13)
  },
  logo: {
    marginTop: 5,
    maxWidth: '50%',
    maxHeight: '60%',
  },
  calendarLogo: {
    maxWidth: '40%',
    maxHeight: '70%',
  },
  text: {
    alignItems: 'center',
    flex: 1,
  },
  calendarContainer: {
    alignItems: 'flex-end',
  },
});
