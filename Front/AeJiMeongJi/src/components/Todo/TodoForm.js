import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Button from '../ui/Button';
import Input from './Input';
import {Colors} from '../../constants/styles';
import SwitchToggle from 'react-native-switch-toggle';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const url = 'http://i7d203.p.ssafy.io:8080';
const TodoForm = () => {
  const navigation = useNavigation();
  const dogId = useSelector(state => state.profile.id);
  const [isHome, setIsHome] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [content, setContent] = useState('');

  const inputChangeHandler = entredValue => {
    setContent(entredValue);
  };

  const backHandler = () => {
    navigation.navigate('CalendarHome');
  };

  const submitHandler = () => {
    // if (content == '') {
    //   Alert.alert('내용을 입력해주세요');
    //   return;
    // }

    console.log('content');
    console.log(content);

    let data = {
      content: content,
      date: '2022-08-12',
      isActive: isHome,
      isAlert: isAlert,
    };

    axios
      .post(url + `/api/dog/${dogId}/calendar`, data, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        if (response.status == 200) {
          console.log('To-Do 등록 성공');
          console.log(response);
        } else {
          console.log('To-Do 등록에 실패했습니다.');
        }
      });
  };

  return (
    <View style={{flex: 1}}>
      <Input
        textInputConfig={{
          placeholder: '할 일을 입력하세요',
          autoCapitalize: 'none',
          autoFocus: true,
          onChangeText: inputChangeHandler.bind(this),
        }}
        onChange={e => {
          console.log(e.target.value);
          setContent(e.target.value);
        }}
      />

      <View style={styles.btnContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2, marginTop: 13, marginLeft: 10}}>
            <Text style={[styles.font, styles.mainText]}>홈 화면에서 보기</Text>
          </View>
          <View style={{flex: 1}}>
            <SwitchToggle
              switchOn={isHome}
              onPress={() => setIsHome(!isHome)}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2, marginTop: 13, marginLeft: 10}}>
            <Text style={[styles.font, styles.mainText]}>푸시알람 받기</Text>
          </View>
          <View style={{flex: 1}}>
            <SwitchToggle
              switchOn={isAlert}
              onPress={() => setIsAlert(!isAlert)}
            />
          </View>
        </View>
      </View>

      <View style={styles.btnContainer2}>
        <Button onPress={submitHandler}>등록하기</Button>
      </View>
      <View style={styles.btnContainer3}>
        <Button onPress={backHandler}>뒤로가기</Button>
      </View>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  font: {
    fontFamily: 'ONE Mobile POP',
  },
  contentFont: {
    fontFamily: 'ONE Mobile Regular',
    fontWeight: 'bold',
  },

  mainText: {
    fontSize: 20,
    lineHeight: 40,
    letterSpacing: 4,
    color: Colors.contentText,
  },
  subText: {
    fontSize: 18,
    lineHeight: 40,
    letterSpacing: 4,
    color: Colors.contentText,
  },

  contentText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 2,
    color: Colors.contentText,
  },

  btnContainer: {
    flex: 1,
    width: '100%',
    marginTop: 24,
    alignSelf: 'center',
  },
  btnContainer2: {
    flex: 1,
    width: '70%',
    marginTop: 40,
    alignSelf: 'center',
  },
  btnContainer3: {
    flex: 1,
    width: '70%',
    marginTop: 40,
    alignSelf: 'center',
  },
});
