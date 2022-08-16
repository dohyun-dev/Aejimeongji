import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {format, setDay} from 'date-fns';
import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
const url = 'http://i7d203.p.ssafy.io:8080';

const Todo = () => {
  const [today, setToday] = useState(format(new Date(), 'yyyy-MM-dd'));
  const dogId = useSelector(state => state.profile.id);
  const [isPress1, setIsPress1] = React.useState(false);
  const [isPress2, setIsPress2] = React.useState(false);
  const [isPress3, setIsPress3] = React.useState(false);
  const [todolist, setTodolist] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(url + `/api/dog/${dogId}/calendar?date=${today}&isActive=true`)
      .then(response => {
        console.log('reponse찍기');
        console.log(response);
        if (response.status == 200) {
          console.log('오늘의 isActive to-do');
          console.log(response.data);
          setTodolist(response.data);
        } else {
          console.log(error.response + 'todo받기에러');
        }
      });
  }, []);

  return (
    <View style={styles.box}>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.font, styles.font18, styles.line40]}>To-do </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('CalendarHome');
          }}>
          <Image
            style={styles.plus}
            resizeMode="contain"
            source={require('../../Assets/image/plus.png')}
          />
        </Pressable>
      </View>
      <View style={styles.todobox}>
        {todolist.length == 0 ? (
          <Image
            style={styles.nothing}
            resizeMode="contain"
            source={require('../../Assets/image/nothing-todo.jpg')}
          />
        ) : (
          <>
            {todolist.map((todo, index) => {
              if (index == 0) {
                return (
                  <View key={index} style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={isPress1 ? styles.checkbox : styles.checknonbox}
                      onPress={() => {
                        setIsPress1(!isPress1);
                      }}
                    />

                    <Text style={[styles.font, styles.titleText]}>
                      {todo.content}
                    </Text>
                  </View>
                );
              } else if (index == 1) {
                return (
                  <View key={index} style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={isPress2 ? styles.checkbox : styles.checknonbox}
                      onPress={() => {
                        setIsPress2(!isPress2);
                      }}
                    />

                    <Text style={[styles.font, styles.titleText]}>
                      {todo.content}
                    </Text>
                  </View>
                );
              } else if (index == 2) {
                return (
                  <View key={index} style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={isPress3 ? styles.checkbox : styles.checknonbox}
                      onPress={() => {
                        setIsPress3(!isPress3);
                      }}
                    />

                    <Text style={[styles.font, styles.titleText]}>
                      {todo.content}
                    </Text>
                  </View>
                );
              }
            })}
          </>
        )}
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  //글꼴
  font: {
    fontFamily: 'Cafe24Ssurround',
    letterSpacing: 4,
    color: Colors.contentText,
  },

  //글자 크기
  font10: {fontSize: responsiveFontSize(1)},
  font12: {fontSize: responsiveFontSize(1.3)},
  font14: {fontSize: responsiveFontSize(1.6)},
  font18: {fontSize: responsiveFontSize(1.99)},
  font20: {fontSize: responsiveFontSize(1.9999)},
  line20: {lineHeight: 20},
  line40: {lineHeight: 40},
  self: {
    alignSelf: 'center',
  },

  titleText: {
    fontSize: responsiveFontSize(1.6),
    lineHeight: 40,
    letterSpacing: 4,
    color: Colors.contentText,
  },

  box: {
    alignSelf: 'center',
    width: '80%',
    marginTop: responsiveHeight(6),
    marginBottom: responsiveHeight(10),
  },
  todobox: {
    height: responsiveHeight(20),
    alignSelf: 'center',
    width: responsiveWidth(80),
    backgroundColor: Colors.contentBox,
    borderRadius: 20,
    paddingLeft: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingRight: responsiveWidth(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  checkbox: {
    borderWidth: 2,
    borderColor: Colors.btnBack100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1.3),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  checknonbox: {
    borderWidth: 2,
    borderColor: Colors.btnBack100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1.3),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    backgroundColor: Colors.btnBack100,
    borderRadius: 100,
  },
  nothing: {
    width: responsiveWidth(70),
    height: responsiveHeight(16),
  },
  plus: {
    marginTop: 5,
    maxWidth: responsiveWidth(30),
    maxHeight: responsiveHeight(4),
    marginRight: responsiveWidth(-4),
  },
});
