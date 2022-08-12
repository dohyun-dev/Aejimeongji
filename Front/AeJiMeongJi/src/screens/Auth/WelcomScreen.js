import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../constants/styles';
import Button from '../../components/ui/Button';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const WelcomeScreen = ({navigation}) => {
  const goToScreen = indicator => {
    navigation.navigate(indicator);
  };

  return (
    <View style={styels.rootContainer}>
      <View>
        <Image
          style={styels.logo}
          source={require('../../Assets/image/welcome-logo.png')}
          resizeMode="contain"
        />
        <View style={styels.btnOuterContainer}>
          <View style={styels.btnInnerContainer}>
            <Button onPress={goToScreen.bind(this, 'Login')}>로그인</Button>
          </View>
          <View style={styels.btnInnerContainer}>
            <Button onPress={goToScreen.bind(this, 'Signup')}>회원가입</Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styels = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.back100,
    justifyContent: 'center',
  },
  logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  btnOuterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnInnerContainer: {
    marginTop: responsiveHeight(4),
    width: responsiveWidth(70),
  },
});
