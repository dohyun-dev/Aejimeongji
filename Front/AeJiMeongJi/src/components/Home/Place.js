import React from 'react';
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

import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';

const Place = () => {
  const navigation = useNavigation();

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

      <View style={styles.placebox}>
        <Image
          style={{
            width: responsiveWidth(80),
            height: responsiveHeight(25),
            borderRadius: 20,
          }}
          resizeMode="cover"
          source={require('../../Assets/image/강아지숲.png')}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.font, styles.font18, styles.line40]}>
            강아지 숲
            <Text style={[styles.font, styles.font12, styles.line40]}>
              {'  '}테마파크
            </Text>
          </Text>
          <Text style={{lineHeight: 40, marginRight: responsiveHeight(2)}}>
            <Text style={{color: 'red'}}>★ </Text>4.3/5
          </Text>
        </View>
      </View>
      <View style={[styles.placebox, styles.placesubBox]}>
        <View
          style={[styles.placesubcontent, {marginRight: responsiveHeight(2)}]}>
          <Image
            style={{
              width: responsiveWidth(37),
              height: responsiveHeight(20),
              borderRadius: 20,
            }}
            resizeMode="cover"
            source={require('../../Assets/image/마이무.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.font, styles.font14, styles.line40]}>
              마이무
              <Text style={[styles.font, styles.font10, styles.line40]}>
                {'  '}동물사료제조
              </Text>
            </Text>
          </View>
          <Text style={{lineHeight: 20, marginRight: responsiveHeight(2)}}>
            <Text style={{color: 'red'}}>★ </Text>4.21/5
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
            source={require('../../Assets/image/쿨쿨펫.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.font, styles.font14, styles.line40]}>
              쿨쿨펫
              <Text style={[styles.font, styles.font10, styles.line40]}>
                {'  '}반려동물호텔
              </Text>
            </Text>
          </View>
          <Text style={{lineHeight: 20, marginRight: responsiveHeight(2)}}>
            <Text style={{color: 'red'}}>★ </Text>4.8/5
          </Text>
        </View>
      </View>
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
