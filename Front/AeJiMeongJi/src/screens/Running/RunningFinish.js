import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RunButton from '../../components/ui/RunButton';
import RunButton2 from '../../components/ui/RunButton2';
import {Colors} from '../../constants/styles';
import {fetchRunningData, fetchCalData} from '../../utils/guide.js';
import {useSelector} from 'react-redux';
const RunningFinish = ({navigation, route}) => {
  const dogIds = useSelector(state => state.profile.ids);

  const fetchData = async identifier => {
    const walkingDistance = parseFloat(route.params.distance).toFixed(2);
    const walkingTime =
      +route.params.time.slice(0, 2) / 60 +
      +route.params.time.slice(3, 5) +
      Math.round(+route.params.time.slice(6, 8) / 60);
    const calorie = parseFloat((route.params.distance / 0.1) * 7).toFixed(2);
    console.log(dogIds, 'dogIds');

    const res = await fetchRunningData(walkingDistance, walkingTime);
    if (res.walkingId) {
      const parallel = await Promise.all(
        dogIds.map(dogId => fetchCalData(calorie, dogId, res.walkingId)),
      );
      if (parallel) {
        if (identifier === 'home') {
          navigation.replace('Home');
        } else {
          navigation.replace('RunningInfo');
        }
      }
    }
  };

  return (
    <View style={styles.Container}>
      <Text
        style={{
          fontSize: responsiveFontSize(3.2),
          fontFamily: '강원교육튼튼',
          marginBottom: responsiveHeight(1),
        }}>
        오늘의 산책기록
      </Text>
      <View style={styles.DataContainer}>
        <Text
          style={{
            fontSize: responsiveFontSize(2.6),
            fontFamily: 'IBMPlexSansKR-Bold',
            marginTop: responsiveHeight(4),
            marginBottom: responsiveHeight(2),
          }}>
          8월 15일의 산책
        </Text>
        <View style={styles.RunningContent}>
          <View style={styles.ContentItem}>
            <Text style={styles.itemFont}>
              {parseFloat(route.params.distance * 1000).toFixed(2)} m
            </Text>
          </View>
          <View style={styles.ContentItem}>
            <Text style={styles.itemFont}>{route.params.time}</Text>
          </View>
          <View style={styles.ContentItem}>
            <Text style={styles.itemFont}>
              {' '}
              {parseFloat((route.params.distance / 0.1) * 7).toFixed(2)}kcal
            </Text>
          </View>
        </View>
        <View style={styles.image}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/runfinish.gif')}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.runButton}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RunButton
            onPress={fetchData.bind(this, 'home')}
            //   () => {
            //   navigation.navigate('Home');
            // }}
            styel={styles.runLoginButton}>
            산책 완료
          </RunButton>
          <RunButton2 onPress={fetchData}>산책 이력</RunButton2>
        </View>
      </View>
    </View>
  );
};

export default RunningFinish;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.back200,
    justifyContent: 'center',
  },
  image: {
    marginBottom: responsiveHeight(2),
    height: responsiveHeight(24),
    width: responsiveWidth(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  DataContainer: {
    backgroundColor: Colors.back100,
    height: responsiveHeight(50),
    width: responsiveWidth(80),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  RunningContent: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  ContentItem: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    marginHorizontal: responsiveWidth(2),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEB887',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  itemFont: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'IBMPlexSansKR-Bold',
  },
  runButton: {
    marginTop: responsiveHeight(4),
  },
});
