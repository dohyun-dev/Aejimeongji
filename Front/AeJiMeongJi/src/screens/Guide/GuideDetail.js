import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {SafeAreaView, ScrollView} from 'react-native';
import GuideShare from '../../components/Guide/GuideShare';
import GuideLike from '../../components/Guide/GuideLike';

const GuideDetail = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.imgBox}>
          <Image
            style={styles.runImg}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.container}>
          <View style={styles.contentBox}>
            <View style={styles.Title}>
              <Text
                style={{
                  fontSize: responsiveFontSize(3.7),
                  marginBottom: responsiveHeight(4),
                  fontWeight: 'bold',
                }}>
                제목이 들어갈 자리
              </Text>
            </View>
            <View style={styles.subTitle}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.7),
                  marginBottom: responsiveHeight(3),
                  fontWeight: 'bold',
                }}>
                소제목이 들어갈 자리
              </Text>
            </View>
            <View style={styles.content}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  marginBottom: responsiveHeight(3),
                }}>
                밤은 다시 길고 깊어졌네 나는 점점 너로 잠 못 들게 돼 글로
                적어내긴 어려운 이 기분을 너도 느꼈으면 좋겠는데 너는 아무 생각
                없이 몇 번 나를 지나가며 웃은 거라지만 나의 하얀 옷에 너의
                잉크가 묻어 닦아낼 수 없을 만큼 번졌네 달콤한 색감이 물들어
                조금씩 정신을 차렸을 땐 알아볼 수도 없지 가득 찬 마음이 여물다
                못해 터지고 있어 내일은 말을 걸어봐야지 요즘 노랜 뭔가 맘에 안
                들어 네게 불러 주기엔 좀 어려워서 나름 며칠 밤을 새워 연습했지만
                네게 들려주기엔 무리인 것 같아 너는 번질수록 진해져 가고 나의
                밤은 좀 더 길고 외롭지만 하루종일 떠오르는 너의 얼굴은 방을 가득
                채워 무지개같이 달콤한 색감이 물들어 조금씩 정신을 차렸을 땐
                알아볼 수도 없지 가득 찬 마음이 여물다 못해 터지고 있어 내일은
                말을 걸어봐야지 바람을 맞고 빗물에 젖어 나의 색감도 흐려지겠지만
                너는 항상 빛에 반짝일 테니까 멋진 말들을 전하지 못하고 아무도
                관심 없는 그림이 되겠지만 달콤한 색감은 감추지 못해 터지고 있어
                내일은 말을 걸어봐야지 그냥 이 노래가 어떨까 싶어
              </Text>
            </View>
            <View>
              <Image
                style={styles.contentImg}
                source={require('../../Assets/image/3d_dog.png')}
                resizeMode="contain"
              />
            </View>
            <View style={styles.subTitle}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.7),
                  marginBottom: responsiveHeight(3),
                  fontWeight: 'bold',
                }}>
                소제목이 들어갈 자리
              </Text>
            </View>
            <View style={styles.content}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  marginBottom: responsiveHeight(3),
                }}>
                밤은 다시 길고 깊어졌네 나는 점점 너로 잠 못 들게 돼 글로
                적어내긴 어려운 이 기분을 너도 느꼈으면 좋겠는데 너는 아무 생각
                없이 몇 번 나를 지나가며 웃은 거라지만 나의 하얀 옷에 너의
                잉크가 묻어 닦아낼 수 없을 만큼 번졌네 달콤한 색감이 물들어
                조금씩 정신을 차렸을 땐 알아볼 수도 없지 가득 찬 마음이 여물다
                못해 터지고 있어 내일은 말을 걸어봐야지 요즘 노랜 뭔가 맘에 안
                들어 네게 불러 주기엔 좀 어려워서 나름 며칠 밤을 새워 연습했지만
                네게 들려주기엔 무리인 것 같아 너는 번질수록 진해져 가고 나의
                밤은 좀 더 길고 외롭지만 하루종일 떠오르는 너의 얼굴은 방을 가득
                채워 무지개같이 달콤한 색감이 물들어 조금씩 정신을 차렸을 땐
                알아볼 수도 없지 가득 찬 마음이 여물다 못해 터지고 있어 내일은
                말을 걸어봐야지 바람을 맞고 빗물에 젖어 나의 색감도 흐려지겠지만
                너는 항상 빛에 반짝일 테니까 멋진 말들을 전하지 못하고 아무도
                관심 없는 그림이 되겠지만 달콤한 색감은 감추지 못해 터지고 있어
                내일은 말을 걸어봐야지 그냥 이 노래가 어떨까 싶어
              </Text>
            </View>
            <View>
              <Image
                style={styles.contentImg}
                source={require('../../Assets/image/3d_dog.png')}
                resizeMode="contain"
              />
            </View>
            <View style={styles.subTitle}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.7),
                  marginBottom: responsiveHeight(3),
                  fontWeight: 'bold',
                }}>
                소제목이 들어갈 자리
              </Text>
            </View>
            <View style={styles.content}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  marginBottom: responsiveHeight(3),
                }}>
                밤은 다시 길고 깊어졌네 나는 점점 너로 잠 못 들게 돼 글로
                적어내긴 어려운 이 기분을 너도 느꼈으면 좋겠는데 너는 아무 생각
                없이 몇 번 나를 지나가며 웃은 거라지만 나의 하얀 옷에 너의
                잉크가 묻어 닦아낼 수 없을 만큼 번졌네 달콤한 색감이 물들어
                조금씩 정신을 차렸을 땐 알아볼 수도 없지 가득 찬 마음이 여물다
                못해 터지고 있어 내일은 말을 걸어봐야지 요즘 노랜 뭔가 맘에 안
                들어 네게 불러 주기엔 좀 어려워서 나름 며칠 밤을 새워 연습했지만
                네게 들려주기엔 무리인 것 같아 너는 번질수록 진해져 가고 나의
                밤은 좀 더 길고 외롭지만 하루종일 떠오르는 너의 얼굴은 방을 가득
                채워 무지개같이 달콤한 색감이 물들어 조금씩 정신을 차렸을 땐
                알아볼 수도 없지 가득 찬 마음이 여물다 못해 터지고 있어 내일은
                말을 걸어봐야지 바람을 맞고 빗물에 젖어 나의 색감도 흐려지겠지만
                너는 항상 빛에 반짝일 테니까 멋진 말들을 전하지 못하고 아무도
                관심 없는 그림이 되겠지만 달콤한 색감은 감추지 못해 터지고 있어
                내일은 말을 걸어봐야지 그냥 이 노래가 어떨까 싶어
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <GuideLike></GuideLike>
          <GuideShare></GuideShare>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.back100,
    padding: 20,
    height: 2200,
  },
  footer: {
    backgroundColor: Colors.back200,
    paddingHorizontal: responsiveWidth(10),
  },
  imgBox: {
    backgroundColor: Colors.back100,
  },
  runImg: {
    maxWidth: '100%',
    height: responsiveHeight(40),
    marginBottom: responsiveHeight(3),
  },
  contentBox: {},
  contentImg: {
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(4),
    maxWidth: '100%',
    height: responsiveHeight(30),
  },
  Title: {},
  subTitle: {},
  content: {},
});

export default GuideDetail;
