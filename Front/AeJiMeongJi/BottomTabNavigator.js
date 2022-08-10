import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity  ,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RunningHome from './src/screens/Running/RunningHome';
import MainHome from './src/screens/Home/MainHome';
import GuideHome from './src/screens/Guide/GuideHome';

import Initial from './src/screens/Initial';
import {Colors} from './src/constants/styles';

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.contentBox,
          height: responsiveHeight(7),
          borderTopLeftRadius: responsiveWidth(4.5),
          borderTopRightRadius: responsiveWidth(4.5),
        },
      }}
      initialRouteName="Initial">
      <BottomTab.Screen
        name="Initial"
        component={Initial}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  width: responsiveWidth(7),
                  height: responsiveWidth(7),
                }}
                resizeMode="contain"
                source={require('./src/Assets/image/navbar/place.png')}
              />
            );
          },
        }}
      />

      <BottomTab.Screen
        name="RunningHome"
        component={RunningHome}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  width: responsiveWidth(7),
                  height: responsiveWidth(7),
                }}
                resizeMode="contain"
                source={require('./src/Assets/image/navbar/running.png')}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="GuideHome"
        component={GuideHome}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  width: responsiveWidth(7),
                  height: responsiveWidth(7),
                }}
                resizeMode="contain"
                source={require('./src/Assets/image/navbar/guide.png')}
              />
            );
          },
        }}
      />

      <BottomTab.Screen
        name="Home"
        component={MainHome}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  width: responsiveWidth(15),
                  height: responsiveWidth(15),
                }}
                resizeMode="contain"
                source={require('./src/Assets/image/home-logo.png')}
              />
            );
          },
        }}
      />
      {/* <BottomTab.Screen name="GuideHome" component={GuideHome} />
      <BottomTab.Screen name="GuideHome" component={GuideHome} /> */}
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
