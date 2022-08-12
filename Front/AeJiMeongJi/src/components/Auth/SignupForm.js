import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, TextInput, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {authActions} from '../../store/auth';
import Button from '../ui/Button';
import Input from './Input';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const emailRegex =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const emailIsValid = emailRegex.test(inputValues.email);
  const confirmPasswordIsValid =
    inputValues.password === inputValues.confirmPassword ? true : false;
  const passwordIsValid = passwordRegex.test(inputValues.password);

  const [errors, setErrors] = useState({
    email: true,
    password: true,
    confirmPassword: true,
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues(curValue => {
      return {
        ...curValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const onBlurHandler = inputIdentifier => {
    setErrors(curValue => {
      switch (inputIdentifier) {
        case 'email':
          return {
            ...curValue,
            [inputIdentifier]: emailIsValid,
          };
        case 'password':
          return {
            ...curValue,
            [inputIdentifier]: passwordIsValid,
          };
        case 'confirmPassword':
          return {
            ...curValue,
            [inputIdentifier]: confirmPasswordIsValid,
          };
        default:
          break;
      }
    });
  };

  const submitHandler = () => {
    if (!emailIsValid) {
      Alert.alert('email을 확인해주세요');
      return;
    } else if (!passwordIsValid) {
      Alert.alert('password를 확인해주세요');
      return;
    } else if (!confirmPasswordIsValid) {
      Alert.alert('password가 일치하지 않습니다.');
      return;
    }

    dispatch(
      authActions.fetchInfo({
        email: inputValues.email,
        password: inputValues.password,
      }),
    );

    navigation.navigate('Signup2', {
      ...inputValues,
    });
  };

  return (
    <View>
      <Input
        textInputConfig={{
          value: inputValues.email,
          placeholder: 'email',
          autoCapitalize: 'none',
          autoFocus: true,
          onChangeText: inputChangeHandler.bind(this, 'email'),
          onBlur: onBlurHandler.bind(this, 'email'),
        }}
        style={!errors.email && !emailIsValid ? styles.input : null}
      />
      <Input
        textInputConfig={{
          value: inputValues.password,
          placeholder: 'password',
          autoCapitalize: 'none',
          onChangeText: inputChangeHandler.bind(this, 'password'),
          secureTextEntry: true,
          onBlur: onBlurHandler.bind(this, 'password'),
        }}
        style={!errors.password && !passwordIsValid ? styles.input : null}
      />
      {!errors.password && !passwordIsValid && (
        <View>
          <Text style={styles.errorMessage}>비밀번호는 8자리 이상,</Text>
          <Text style={styles.errorMessage}>
            영어 대소문자, 숫자 및 특수 문자를 포함해주세요.
          </Text>
        </View>
      )}
      <Input
        textInputConfig={{
          value: inputValues.confirmPassword,
          placeholder: 'confirm password',
          autoCapitalize: 'none',
          onChangeText: inputChangeHandler.bind(this, 'confirmPassword'),
          secureTextEntry: true,
          onBlur: onBlurHandler.bind(this, 'confirmPassword'),
        }}
        style={
          !confirmPasswordIsValid && !errors.confirmPassword
            ? styles.input
            : null
        }
      />
      {!confirmPasswordIsValid && !errors.confirmPassword && (
        <View>
          <Text style={styles.errorMessage}>비밀번호를 확인해주세요.</Text>
        </View>
      )}
      <View style={styles.btnContainer}>
        <Button style={styles.btn} onPress={submitHandler}>
          다음
        </Button>
      </View>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    width: responsiveWidth(50),
    marginTop: 24,
    alignSelf: 'center',
  },
  input: {
    borderColor: 'red',
  },
  errorMessage: {
    fontSize: responsiveFontSize(1),
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
    color: 'red',
    paddingLeft: responsiveWidth(3),
  },
  btn: {
    // flex: 1,
    paddingHorizontal: 30,
  },
});
