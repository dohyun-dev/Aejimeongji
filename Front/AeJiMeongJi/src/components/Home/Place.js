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
import axios from 'axios';

import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
const url = 'http://i7d203.p.ssafy.io:8080';

const Place = () => {
  const navigation = useNavigation();
  const [bestPlace, setBestPlace] = useState({});

  useEffect(() => {
    axios.get(url + `/api/petplace/pop`).then(response => {
      if (response.status == 200) {
        setBestPlace(response.data);
      } else {
        console.log(error.response + '플레이스 가져오기 에러');
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
        <Text style={[styles.font, styles.font18, styles.line40]}>
          인기 방문 장소
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('PlaceHome');
          }}>
          <Image
            style={styles.plus}
            resizeMode="contain"
            source={require('../../Assets/image/plus.png')}
          />
        </Pressable>
      </View>
      {bestPlace[0] ? (
        <View style={styles.placebox}>
          <Image
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(25),
              borderRadius: 20,
            }}
            resizeMode="cover"
            source={{
              uri: bestPlace[0].petplaceImageUrl[0],
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.font, styles.font18, styles.line40]}>
              {bestPlace[0].name}
              <Text style={[styles.font, styles.font12, styles.line40]}>
                {'  '}
                {bestPlace[0].category}
              </Text>
            </Text>
            <Text style={{lineHeight: 40, marginRight: responsiveHeight(2)}}>
              <Text style={{color: 'red'}}>★ </Text>
              {bestPlace[0].rating}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
      {bestPlace[0] ? (
        <View style={[styles.placebox, styles.placesubBox]}>
          <View
            style={[
              styles.placesubcontent,
              {marginRight: responsiveHeight(2)},
            ]}>
            <Image
              style={{
                width: responsiveWidth(37),
                height: responsiveHeight(20),
                borderRadius: 20,
              }}
              resizeMode="cover"
              source={{uri: bestPlace[1].petplaceImageUrl[0]}}
            />
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.font, styles.font14, styles.line40]}>
                {bestPlace[1].name}
              </Text>
              <Text style={[styles.font, styles.font10, styles.line40]}>
                {bestPlace[1].category}
              </Text>
            </View>
            <Text
              style={{
                lineHeight: 20,
                alignSelf: 'flex-end',
                marginRight: responsiveHeight(2),
                marginTop: responsiveHeight(-4),
              }}>
              <Text style={{color: 'red'}}>★ </Text> {bestPlace[1].rating}
            </Text>
          </View>
          <View
            style={[styles.placesubcontent, {marginLeft: responsiveHeight(2)}]}>
            <Image
              style={{
                width: responsiveWidth(37),
                height: responsiveHeight(20),
                borderRadius: 20,
              }}
              resizeMode="cover"
              source={{uri: bestPlace[2].petplaceImageUrl[0]}}
            />
            <View
              style={{
                // flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.font, styles.font14, styles.line40]}>
                {bestPlace[2].name}
              </Text>
              <Text style={[styles.font, styles.font10, styles.line40]}>
                {bestPlace[2].category}
              </Text>
            </View>
            <Text
              style={{
                lineHeight: 20,
                alignSelf: 'flex-end',
                marginRight: responsiveHeight(2),
                marginTop: responsiveHeight(-4),
              }}>
              <Text style={{color: 'red'}}>★ </Text> {bestPlace[2].rating}
            </Text>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Place;

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

  box: {
    alignSelf: 'center',
    width: responsiveWidth(80),
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(4),
  },
  plus: {
    marginTop: 5,
    maxWidth: responsiveWidth(30),
    maxHeight: responsiveHeight(4),
    marginRight: responsiveWidth(-4),
  },

  placebox: {
    height: responsiveHeight(30),
    width: responsiveWidth(80),
    borderRadius: 20,
    marginBottom: responsiveHeight(5),
  },
  placesubBox: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(5),
  },
  placesubcontent: {
    flex: 1,
  },
});
