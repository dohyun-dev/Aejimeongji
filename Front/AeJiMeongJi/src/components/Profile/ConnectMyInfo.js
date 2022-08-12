import {Avatar} from '@rneui/base';
import React, {useLayoutEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {useSelector} from 'react-redux';
import {getDog} from '../../utils/profile';
import {useNavigation} from '@react-navigation/native';

const ConnectMyInfo = ({source,dogName}) => {
  const navigation = useNavigation();
  const goToMyInfo = () => {
    navigation.navigate('MyInfo')
  };

  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.circle}>
            <Avatar
              rounded
              size="medium"
              source={require('../../Assets/image/home-logo.png')}
            />
          </View>
        </View>
        <View style={styles.dogNameContainer}>
          <Text style={styles.dogName}>{dogName}</Text>
        </View>
      </View>
      <Pressable onPress={goToMyInfo} style={styles.sawToothContainer}>
        <Image
          style={styles.sawTooth}
          source={require('../../Assets/image/saw-tooth.png')}
        />
      </Pressable>
    </View>
  );
};

export default ConnectMyInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: responsiveWidth(75),
    height: responsiveHeight(10),
    borderRadius: responsiveWidth(8),
    borderColor: Colors.ProfileInputBorder,
    backgroundColor: Colors.ProfileInputBorder,
    marginVertical: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  smallContainer: {
    flexDirection: 'row',
  },
  dogNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogName: {
    color: '#6D6D6D',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsiveWidth(3),
    // backgroundColor: '#FBE5BC',
    // borderRadius: responsiveWidth(10),
    // width: responsiveWidth(10),
    // height: responsiveWidth(10),
  },
  circle: {
    backgroundColor: '#FBE5BC',
    borderRadius: responsiveWidth(10),
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sawToothContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: responsiveWidth(4),
  },
  sawTooth: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
});
