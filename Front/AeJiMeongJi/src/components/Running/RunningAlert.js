import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

import {
  StyleSheet,
  View,
  Text,
  Alert,
  AppRegistry,
  TouchableHighlight,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RunButton from '../../components/ui/RunButton';

const RunningAlert = props => {
  console.log(`running alert에서 찍는`, props);

  const [start, setStart] = useState(true);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const navigation = useNavigation();

  const timeKeeper = time => {
    if (loading) {
      console.log(time);
    }
  };

  const createThreeButtonAlert = () => {
    setLoading(true);
    timeKeeper();

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
          onPress: async () => {
            // 포스트요청 거리랑, 시간을 보냄
            navigation.replace('RunningFinish', {distance: props.data, data});
          },
        },
      ],
    );
  };
  return (
    <View>
      <View>
        <Stopwatch laps secs start={start} reset={reset} getTime={timeKeeper} />
      </View>

      <RunButton title={'3-Button Alert'} onPress={createThreeButtonAlert}>
        산책종료
      </RunButton>
    </View>
  );
};

export default RunningAlert;
