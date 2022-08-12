import axios from 'axios';
import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LoginForm from '../../components/Auth/LoginForm';
import Button from '../../components/ui/Button';
import {Colors} from '../../constants/styles';

const LoginScreen = () => {


  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>로그인</Text>
      </View>
      <View style={styles.inputContainer}>
        <LoginForm />
      </View>
    </View>
  );
};

export default LoginScreen;

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
});
