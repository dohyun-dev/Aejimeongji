import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../constants/styles';
import img1 from '../../Assets/image/banner1.jpg';
import img2 from '../../Assets/image/banner2.jpg';
import img3 from '../../Assets/image/banner3.jpg';
import img4 from '../../Assets/image/banner4.jpg';
import img5 from '../../Assets/image/banner5.jpg';
const imageArr = [img1, img2, img3, img4, img5];

const Guide = () => {
  const navigation = useNavigation();

  const random = Math.floor(Math.random() * 5 + 1);
  console.log(random);

  return (
    <View style={styles.box}>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.font, styles.font18, styles.line40]}>
          애견 가이드
        </Text>
      </View>

      <View style={styles.guideclickbox}>
        <TouchableOpacity
          onPress={() => {
            console.log('클릭');
            navigation.navigate('Guide');
          }}
          style={{width: '100%'}}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
              marginTop: -10,
            }}
            resizeMode="contain"
            source={imageArr[Math.floor(Math.random() * 5)]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Guide;

const styles = StyleSheet.create({
  //글꼴
  font: {
    fontFamily: 'ONE Mobile POP',
    letterSpacing: 4,
    color: Colors.contentText,
  },
  contentFont: {
    fontFamily: 'ONE Mobile Regular',
    fontWeight: 'bold',
  },
  //글자 크기
  font10: {fontSize: 10},
  font12: {fontSize: 12},
  font14: {fontSize: 14},
  font18: {fontSize: 18},
  font20: {fontSize: 20},
  line20: {lineHeight: 20},
  line40: {lineHeight: 40},
  self: {
    alignSelf: 'center',
  },

  box: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 0,
    marginBottom: 70,
  },
  plus: {
    marginTop: 5,
    maxWidth: '40%',
    maxHeight: '80%',
    marginRight: -20,
  },

  guideclickbox: {
    height: 150,
    alignSelf: 'center',
    backgroundColor: Colors.contentBox,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
