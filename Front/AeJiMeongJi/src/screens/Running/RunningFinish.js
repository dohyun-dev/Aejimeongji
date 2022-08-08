import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, Alert, Image} from 'react-native';
import RunButton from '../../components/ui/RunButton';
import RunButton2 from '../../components/ui/RunButton2';
import {Colors} from '../../constants/styles';

const RunningFinish = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 8}}>
        오늘의 산책기록
      </Text>
      <View style={styles.DataContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 30}}>
          8월 8일의 산책
        </Text>
        <View style={styles.RunningContent}>
          <View style={styles.ContentItem}>
            <Text style={styles.itemFont}>1000m</Text>
          </View>
          <View style={styles.ContentItem}>
            <Text style={styles.itemFont}>00:10:00</Text>
          </View>
          <View style={styles.ContentItem}>
            <Text style={styles.itemFont}>100kcal</Text>
          </View>
        </View>
        <View style={styles.image}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/dog_running.png')}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.runButton}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RunButton
            onPress={() => {
              navigation.navigate('Home');
            }}
            styel={styles.runLoginButton}>
            산책 완료
          </RunButton>
          <RunButton2
            onPress={() => {
              navigation.navigate('RunningInfo');
            }}>
            산책 이력
          </RunButton2>
        </View>
      </View>
    </View>
  );
};

export default RunningFinish;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.back200,
    justifyContent: 'center',
  },
  image: {
    marginBottom: 30,
    borderRadius: 130,
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DataContainer: {
    backgroundColor: Colors.back100,
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  RunningContent: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  ContentItem: {
    width: 80,
    height: 80,
    margin: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  itemFont: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  runButton: {
    marginTop: 10,
  },
});
