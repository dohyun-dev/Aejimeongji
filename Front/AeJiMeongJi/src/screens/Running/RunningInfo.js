import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import RunButton3 from '../../components/ui/RunButton3';
import RunningData from '../../components/Running/RunningData';

const RunningInfo = ({navigation}) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.Title}>앵두의 산책이력</Text>
      <RunningData style={styles.InfoList}></RunningData>
      <RunButton3
        onPress={() => {
          navigation.navigate('RunningHome');
        }}>
        확인완료
      </RunButton3>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.back100,
    justifyContent: 'center',
  },
  Title: {
    textAlign: 'center',
    fontSize: responsiveFontSize(3.2),
    fontFamily: '강원교육튼튼',
    marginBottom: 20,
  },
  InfoList: {
    backgroundColor: Colors.back200,
    height: responsiveHeight(80),
    width: responsiveWidth(85),
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RunningInfo;
