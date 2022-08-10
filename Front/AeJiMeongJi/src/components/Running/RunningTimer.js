import React, {useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// importing library to use Stopwatch and Timer
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import RunButton3 from '../ui/RunButton3';

const RunningTimer = () => {
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        <Stopwatch
          laps
          secs
          start={isStopwatchStart}
          // To start
          reset={resetStopwatch}
          // To reset
          options={options}
          // Options for the styling
        />
        <TouchableHighlight
          onPress={() => {
            setIsStopwatchStart(!isStopwatchStart);
            setResetStopwatch(false);
          }}>
          <Text style={styles.buttonText}>
            {!isStopwatchStart ? '재시작' : '일시정지'}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default RunningTimer;

const styles = StyleSheet.create({
  container: {
    padding: responsiveHeight(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionStyle: {
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
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: responsiveWidth(2),
  },
};
