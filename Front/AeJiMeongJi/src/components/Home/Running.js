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
import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';

const url = 'http://i7d203.p.ssafy.io:8080';
const Running = () => {
  const navigation = useNavigation();
  const dogId = useSelector(state => state.profile.id);
  const [lastKm, setLastKm] = useState('');
  const [runningDate, setRunningDate] = useState({});

  let current = 0;

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

  useEffect(() => {
    axios.get(url + `/api/walking?dog=${dogId}`).then(response => {
      if (response.status == 200) {
        setRunningDate(response.data);

        switch (response.data.totalCount) {
          case 0:
            current = 0;
            break;
          case 1:
          case 2:
          case 3:
            current = 1;
            break;
          case 4:
          case 5:
          case 6:
            current = 2;
            break;
          case 7:
            current = 3;
            break;
        }
      } else {
        console.log(response.status + '이번주 산책 정보 가져오기 에러');
      }
    });

    axios
      .get(url + `/api/walking?dog=${dogId}&lastweek=true`)
      .then(response => {
        if (response.status == 200) {
          setLastKm(response.data.tatalDistance / 1000);
        } else {
          console.log('지난주 산책 정보 가져오기 에러');
        }
      });
  }, []);

  return (
    <View style={styles.runningbox}>
      <View style={styles.runTitle}>
        <Text style={[styles.font, styles.font18, styles.line40, styles.self]}>
          지난주 누적 거리
          <Text style={{color: Colors.btnBack100}}> {lastKm}km</Text>
        </Text>
      </View>
      <View style={styles.runEmoji}>
        <Pressable
          onPress={() => {
            navigation.navigate('RunningHome');
          }}>
          <Image
            style={{
              width: responsiveWidth(25),
              height: responsiveHeight(25),
            }}
            resizeMode="contain"
            source={emoji[current].src}
          />
        </Pressable>
      </View>
      <View style={styles.runData}>
        <Text style={[styles.font, styles.font20, styles.line40]}>
          이번주 산책횟수{' '}
          <Text style={{color: Colors.btnBack100}}>
            {' '}
            {runningDate.totalCount}
          </Text>
          <Text>회</Text>
        </Text>
        {runningDate.totalCount == 0 ? (
          <Text style={[styles.font, styles.font18, styles.line40]}>
            산책이 필요해요😂
          </Text>
        ) : (
          <Text style={[styles.font, styles.font18, styles.line40]}>
            합산기록{'  '}
            <Text style={{color: Colors.btnBack100}}>
              {' '}
              {runningDate.totalMinute}
            </Text>
            <Text> 분{'  '}</Text>
            <Text style={{color: Colors.btnBack100}}>
              {(runningDate.totalDistance / 1000).toFixed(2)}
            </Text>
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

    height: responsiveHeight(6),
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
