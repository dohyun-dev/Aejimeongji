import React from 'react';
import {Image, StyleSheet, View, Text, Button} from 'react-native';
import {Colors} from '../../constants/styles';
import {StackActions} from '@react-navigation/native';

const Initial = ({navigation}) => {
  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate('Home');
        }}
        title="Home"></Button>
      <Button
        onPress={() => {
          navigation.navigate('Welcome');
        }}
        title="Welcome"></Button>
      <Button
        onPress={() => {
          navigation.navigate('RunningHome');
        }}
        title="Running"></Button>
      <Button
        onPress={() => {
          navigation.navigate('ProfileHome');
        }}
        title="Profile"></Button>
      <Button
        onPress={() => {
          navigation.navigate('GuideHome');
        }}
        title="Guide"></Button>

      <Button
        onPress={() => {
          navigation.navigate('ProfileChoice');
        }}
        title="프로필선택"></Button>
      <Button
        onPress={() => {
          navigation.navigate('ProfileEdit');
        }}
        title="강쥐 프로필 변경"></Button>
      <Button
        onPress={() => {
          navigation.navigate('PlaceHome');
        }}
        title="플레이스"></Button>
    </View>
  );
};

export default Initial;
