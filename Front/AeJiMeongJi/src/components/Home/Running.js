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

const Running = () => {
  const current = 3;
  const lastKm = 3.4;
  const num = [0, 2, 5, 7];
  const min = [12, 20, 43];
  const km = [1.3, 1.8, 2.3];
  const emoji = [
    {
      src: require(`../../Assets/image/emoij/cry.png`),
    },
    {
      src: require(`../../Assets/image/emoij/sad.png`),
    },
    {
      src: require(`../../Assets/image/emoij/laughing.png`),
    },
    {
      src: require(`../../Assets/image/emoij/love.png`),
    },
  ];

  return (
    <View style={styles.runningbox}>
      <View style={styles.runTitle}>
        <Text style={[styles.font, styles.font18, styles.line40, styles.self]}>
          지난주 누적 거리
          <Text style={{color: Colors.btnBack100}}> {lastKm}km</Text>
        </Text>
      </View>
      <View style={styles.runEmoji}>
        <Image
          style={{
            width: responsiveWidth(25),
            height: responsiveHeight(25),
          }}
          resizeMode="contain"
          source={emoji[current].src}
        />
      </View>
      <View style={styles.runData}>
        <Text style={[styles.font, styles.font20, styles.line40]}>
          이번주 산책횟수{' '}
          <Text style={{color: Colors.btnBack100}}> {num[current]}</Text>
          <Text>회</Text>
        </Text>
        {num[current] == 0 ? (
          <Text style={[styles.font, styles.font18, styles.line40]}>
            산책이 필요해요😂
          </Text>
        ) : (
          <Text style={[styles.font, styles.font18, styles.line40]}>
            합산기록{'  '}
            <Text style={{color: Colors.btnBack100}}> {min[current - 1]}</Text>
            <Text> 분{'  '}</Text>
            <Text style={{color: Colors.btnBack100}}>{km[current - 1]}</Text>
            <Text> km</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default Running;

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

  runningbox: {
    height: responsiveHeight(40),
    alignSelf: 'center',

    width: responsiveWidth(80),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(3),
  },
  runTitle: {
    width: responsiveWidth(80),

    height: responsiveHeight(5),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    alignSelf: 'center',
    backgroundColor: Colors.contentBox,
    borderRadius: 10,
  },
  runEmoji: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  runData: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
