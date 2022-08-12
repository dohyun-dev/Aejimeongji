import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {getMemberId} from '../../utils/auth';
import CarouselCards from '../../components/Guide/CarouselCards';
import SubCard from '../../components/Guide/SubCard';
import Button from '../../components/ui/Button';
import GuideButton from '../../components/ui/GuideButton';
import {fetchGuideList} from '../../utils/guide';
import axios from '../../utils/index';
import {getDog} from '../../utils/profile';

const url = 'http://i7d203.p.ssafy.io:8080';

const GuideHome = ({navigation}) => {
  const [dogInfo, setDogInfo] = useState();
  const [id, setId] = useState();
  const [guideList, setguideList] = useState([]);

  const dogId = useSelector(state => state.profile.id);

  useLayoutEffect(() => {
    const fetchInitialData = async () => {
      const res = await getDog(dogId);
      if (res) {
        setDogInfo(res.name);
        console.log(res.name);
      }
    };
    fetchInitialData();
  });
  useLayoutEffect(() => {
    const fetchGuide = async () => {
      const response = await axios(url + '/api/guide?dog=' + dogId);
      console.log(response);
      if (response) {
        setguideList(response.data);
      }
    };
    fetchGuide();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory', '건강');
            }}>
            {' '}
            건강{' '}
          </GuideButton>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory', '음식');
            }}>
            {' '}
            음식{' '}
          </GuideButton>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory', '제품');
            }}>
            {' '}
            제품{' '}
          </GuideButton>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory', '행동');
            }}>
            {' '}
            행동{' '}
          </GuideButton>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory', '훈련');
            }}>
            {' '}
            훈련{' '}
          </GuideButton>
        </View>
        <View style={styles.guideTitle}>
          <Text style={{fontSize: responsiveFontSize(2.7), fontWeight: 'bold'}}>
            {dogInfo}를 위한 맞춤형 추천 가이드
          </Text>
        </View>
        <View style={{flex: 3.3}}>
          <CarouselCards style={styles.carouselCards} />
        </View>

        <View style={styles.subGuide}>
          <Text style={styles.subGuideTitle}>
            지금 핫한 반려생활 가이드 Top5!
          </Text>
          <SubCard style={styles.subCards}></SubCard>
          <SubCard style={styles.subCards}></SubCard>
          <SubCard style={styles.subCards}></SubCard>
          <SubCard style={styles.subCards}></SubCard>
          <SubCard style={styles.subCards}></SubCard>
        </View>
        <View style={styles.subguideTitle2}>
          <Text style={{fontSize: responsiveFontSize(2.5), fontWeight: 'bold'}}>
            현재 연령대에 꼭 알아야 하는 정보
          </Text>
        </View>
        <View style={{flex: 3.3}}>
          <CarouselCards style={styles.carouselCards} />
        </View>
        <Button
          onPress={() => {
            navigation.navigate('GuideDetail');
          }}>
          가이드 디테일
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.back100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    height: 2000,
  },
  guideTitle: {
    flex: 0.4,
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(2),
    height: 200,
  },
  subguideTitle2: {
    flex: 0.38,
    marginBottom: responsiveHeight(2),
  },
  subGuideTitle: {
    fontSize: responsiveFontSize(2.7),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(3),
  },
  carouselCards: {},
  subGuide: {
    flex: 9,
    height: 10,
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2),
  },
  subGuide2: {
    flex: 7,
    height: 10,
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2),
  },
  ButtonBox: {},
  subCards: {
    marginBottom: responsiveHeight(2),
  },
});

export default GuideHome;
