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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 7,
  },
};
