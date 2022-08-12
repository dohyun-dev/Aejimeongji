import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../constants/styles';
const NoGuide = () => {
  const navigation = useNavigation();
  const goToGuide = () => {
    navigation.navigate('Guide');
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>아직 즐겨 찾기 한 가이드가 없어요</Text>
      <Pressable onPress={goToGuide}>
        <Text style={styles.goToGuide}>가이드 보러 가기</Text>
      </Pressable>
    </View>
  );
};

export default NoGuide;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.back200,
    borderRadius: responsiveWidth(4),
    paddingVertical: responsiveHeight(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: responsiveWidth(80),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    paddingBottom: responsiveHeight(2)
  },
  goToGuide: {
    color: '#003459'
  }
});
