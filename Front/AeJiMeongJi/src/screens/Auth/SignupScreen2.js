import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import SignupForm from '../../components/Auth/SignupForm2';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import {Colors} from '../../constants/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const SignupScreen2 = () => {
  return (
    <View style={styles.rootContainer}>
      <ProgressBar style={styles.progress} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <SignupForm />
      </View>
    </View>
  );
};
export default SignupScreen2;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.back100,
  },
  titleContainer: {
    flex: 1,
    marginTop: responsiveHeight(3),
    justifyContent: 'center',
  },
  title: {
    color: Colors.btnBack100,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(4),
  },
  inputContainer: {
    flex: 3,
  },
  btn: {
    flex: 1,
    marginTop: responsiveHeight(4),
  },
  progress: {
    width: '100%',
  },
});
