import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
            width: '30%',
            height: '70%',
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

  titleText: {
    fontSize: 14,
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
  contentbox: {
    flex: 14,
    justifyContent: 'center',
    backgroundColor: Colors.back100,
  },

  runningbox: {
    height: 300,
    alignSelf: 'center',

    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  runTitle: {
    width: '80%',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
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
