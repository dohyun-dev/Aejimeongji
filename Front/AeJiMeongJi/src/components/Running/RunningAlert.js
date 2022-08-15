import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RunButton from '../../components/ui/RunButton';

const RunningAlert = props => {
  console.log(`running alert에서 찍는`, props);
  const navigation = useNavigation();
  const createThreeButtonAlert = () =>
    Alert.alert(
      '산책을 종료하시겠어요?',
      '산책이 모두 완료되었다면 종료해주세요',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '완료',
          onPress: () => {
            navigation.navigate('RunningFinish', props.data);
          },
        },
      ],
    );
  return (
    <View>
      <RunButton title={'3-Button Alert'} onPress={createThreeButtonAlert}>
        산책종료
      </RunButton>
    </View>
  );
};

export default RunningAlert;
