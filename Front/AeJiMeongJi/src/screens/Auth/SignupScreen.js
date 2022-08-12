import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SignupForm from '../../components/Auth/SignupForm';
import ProgressBar from '../../components/ui/ProgressBar';
import {Colors} from '../../constants/styles';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.rootContainer}>
      <ProgressBar style={styles.progress} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <SignupForm navigation={navigation} />
      </View>
    </View>
  );
};
export default SignupScreen;

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
    position: 'absolute',
    width: '50%',
    left: 0,
  },
});
