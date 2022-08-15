import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
const Todo = () => {
  const [isPress, setIsPress] = React.useState(false);

  return (
    <View style={styles.box}>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.font, styles.font18, styles.line40]}>To-do </Text>
        <Image
          style={styles.plus}
          resizeMode="contain"
          source={require('../../Assets/image/plus.png')}
        />
      </View>
      <View style={styles.todobox}>
        <View style={{flexDirection: 'row'}}>
          {isPress ? (
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                setIsPress(!isPress);
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.checknonbox}
              onPress={() => {
                setIsPress(!isPress);
              }}
            />
          )}
          <Text style={[styles.font, styles.titleText]}>베리 산책하기</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.checkbox} />
          <Text style={[styles.font, styles.titleText]}>예방접종하기</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.checkbox} />
          <Text style={[styles.font, styles.titleText]}>
            미용실가서 발톱자르기
          </Text>
        </View>
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
    borderColor: Colors.back200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  checknonbox: {
    borderWidth: 2,
    borderColor: Colors.back200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    backgroundColor: Colors.back100,
    borderRadius: 100,
  },
  plus: {
    marginTop: 5,
    maxWidth: responsiveWidth(30),
    maxHeight: responsiveHeight(4),
    marginRight: responsiveWidth(-4),
  },
});
