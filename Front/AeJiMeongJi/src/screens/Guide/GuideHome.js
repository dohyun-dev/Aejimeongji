import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {SafeAreaView, ScrollView} from 'react-native';
import CarouselCards from '../../components/Guide/CarouselCards';
import SubCard from '../../components/Guide/SubCard';
import Button from '../../components/ui/Button';
import GuideButton from '../../components/ui/GuideButton';
import {fetchGuideList} from '../../utils/guide';

const GuideHome = ({navigation}) => {
  const fetchGuide = async children => {
    const res = await fetchGuideList(children);

    navigation.navigate('GuideCategory', {information: title});
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <GuideButton onPress={fetchGuide}> 건강 </GuideButton>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory');
            }}>
            {' '}
            음식{' '}
          </GuideButton>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory');
            }}>
            {' '}
            여행{' '}
          </GuideButton>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory');
            }}>
            {' '}
            훈련{' '}
          </GuideButton>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory');
            }}>
            {' '}
            장소{' '}
          </GuideButton>
          <GuideButton
            onPress={() => {
              navigation.navigate('GuideCategory');
            }}>
            {' '}
            정보{' '}
          </GuideButton>
        </View>
        <View style={styles.guideTitle}>
          <Text style={{fontSize: responsiveFontSize(2.7), fontWeight: 'bold'}}>
            앵두님께 추천드리는 가이드
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
