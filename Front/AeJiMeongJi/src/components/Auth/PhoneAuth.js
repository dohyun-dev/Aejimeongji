import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import {Button as Btn} from '@rneui/themed';
import {confirmCertHandler, fetchCertHandler, register} from '../../utils/auth';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../store/auth';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const PhoneAuth = ({
  inputValues,
  inputChangeHandler,
  onBlurHandler,
  errors,
  phoneIsValid,
}) => {
  // 유저 폰 인증
  const [phoneIsAuthenticated, setPhoneIsAuthenticated] = useState(false);
  const [cert, setCert] = useState(null);
  const certRegex = /^[0-9]{6}$/;
  const certIsValid = certRegex.test(cert);
  const dispatch = useDispatch();
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);
  const [loading, setLoading] = useState(false);
  const [phoneUUID, setPhoneUUID] = useState('');

  const phoneAuthHandler = async () => {
    // Loading 중일 때 버튼을 인증 요청 => 확인

    if (!phoneIsValid || inputValues.phone.length !== 11) {
      return Alert.alert('휴대폰 번호를 확인해주세요.');
    }

    if (!loading) {
      setLoading(true);
      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);
        time.current -= 1;
      }, 1000);
      if (time.current <= 0) {
        clearInterval(timerId.current);
      }
      // 인증번호 요청
      try {
        const res = await fetchCertHandler(inputValues.phone);
        setPhoneUUID(res);
        await dispatch(authActions.fetchPhoneUUID({phoneUUID: res}));
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!certIsValid) {
        Alert.alert('인증번호를 확인해주세요.');
        return;
      }

      console.log(cert, phoneUUID, '출력');
      const res = await confirmCertHandler(cert, phoneUUID);
      console.log(res.data.message);
      switch (res.data.message) {
        case '인증되었습니다.':
          console.log('완료');
          setPhoneIsAuthenticated(true);
          break;
        case '인증번호를 다시 확인해주세요.':
          Alert.alert(res.message);
          break;
        default:
          break;
      }
    }
  };

  const onCertHandler = enteredValue => {
    setCert(enteredValue);
  };

  const changeBtnHandler = () => {
    setLoading(false);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        {!loading && (
          <Input
            textInputConfig={{
              value: inputValues.confirmPassword,
              placeholder: '휴대폰, 숫자만 입력해주세요.',
              autoCapitalize: 'none',
              keyboardType: 'numeric',
              onChangeText: inputChangeHandler.bind(this, 'phone'),
              onBlur: onBlurHandler.bind(this, 'phone'),
            }}
            style={styles.input}
            // style={
            //   !confirmPasswordIsValid && !errors.confirmPassword
            //     ? styles.input
            //     : null
            // }
          />
        )}
        {loading && !phoneIsAuthenticated && (
          <Input
            textInputConfig={{
              placeholder: '인증번호를 입력해주세요',
              keyboardType: 'numeric',
              onChangeText: onCertHandler,
            }}
            style={styles.input}
          />
        )}
        {loading && phoneIsAuthenticated && (
          <View style={styles.afterPhoneAuth}>
            <Text>확인완료 되었습니다.</Text>
          </View>
        )}
        {!loading && (
          <View>
            <Btn
              style={styles.btn}
              title="인증"
              type="clear"
              onPress={phoneAuthHandler}></Btn>
          </View>
        )}
        {loading && time.current > 0 && !phoneIsAuthenticated && (
          <View>
            <Btn
              type="clear"
              style={styles.btn}
              title="확인"
              onPress={phoneAuthHandler}></Btn>
            <Text style={styles.time}>
              {min}분 {sec}초
            </Text>
          </View>
        )}
        {loading && time.current <= 0 && (
          <View>
            <Btn
              style={styles.btn}
              onPress={changeBtnHandler}
              type="clear"
              title="재요청"></Btn>
          </View>
        )}
      </View>
      {!errors.phone && !phoneIsValid && (
        <View>
          <Text style={styles.errorMessage}>숫자만 입력해주세요.</Text>
        </View>
      )}
    </>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    width: responsiveWidth(50),
    marginTop: responsiveHeight(5),
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: responsiveWidth(1),
    width: responsiveWidth(53),
    paddingHorizontal: responsiveWidth(2),
  },
  btn: {
    flex: 1,
  },
  afterPhoneAuth: {
    width: responsiveWidth(50),
    paddingLeft: responsiveWidth(5),
    paddingTop: responsiveHeight(5),
  },
  time: {
    paddingLeft: responsiveWidth(2)
  }
});
