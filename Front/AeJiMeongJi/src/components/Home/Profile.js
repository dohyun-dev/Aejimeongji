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

const Profile = props => {
  const dogInfo = props.dogInfo;
  const setDate = new Date(dogInfo.adoptionDay);

  const now = new Date();
  const distance = now.getTime() - setDate.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;

  return (
    <View style={styles.profile}>
      <View style={styles.profile1}>
        <View style={styles.profile1sub1}>
          <View style={styles.name1}>
            <Image
              style={{
                width: responsiveWidth(10),
                height: responsiveHeight(4),
              }}
              resizeMode="contain"
              source={require('../../Assets/image/name-icon.png')}
            />
          </View>
          <View style={styles.name2}>
            <Text style={[styles.font, styles.font18, styles.line40]}>
              {dogInfo.name}
            </Text>
          </View>
        </View>
        <View style={styles.profile1sub2}>
          <Text style={[styles.font, styles.font18, styles.line40]}>
            가족이 된 지
          </Text>
          {/* 현재날짜 - adoptionDay */}
          <Text style={[styles.font, styles.dday]}>D+{day}</Text>
        </View>
      </View>
      <View style={styles.profile2}>
        <Image
          style={{
            width: responsiveWidth(40),
            height: responsiveHeight(20),
            borderRadius: 100,
            borderColor: Colors.contentText,
            borderWidth: 2,
          }}
          resizeMode="contain"
          source={
            dogInfo.imageName
              ? {
                  uri: `http://i7d203.p.ssafy.io:8080/api/image/${dogInfo.imageName}`,
                }
              : dogInfo.imageName
          }
        />
      </View>
    </View>
  );
};

export default Profile;
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

  profile: {
    flex: 1.3,
    height: responsiveHeight(22),

    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(5),
    alignSelf: 'center',
    width: responsiveWidth(80),
    flexDirection: 'row',
  },
  profile1: {
    flex: 1,
    width: responsiveWidth(50),
    padding: 10,
  },
  profile1sub1: {
    flex: 2.5,
    borderRadius: 10,
    marginBottom: responsiveHeight(3),
    backgroundColor: Colors.contentBox,
    borderColor: Colors.btnBack100,
    borderWidth: 2,
    flexDirection: 'row',
  },
  name1: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: responsiveWidth(2),
  },
  name2: {
    flex: 2.5,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  profile1sub2: {
    flex: 5,
  },
  dday: {
    fontSize: 25,
    lineHeight: 40,
    letterSpacing: 4,
    color: Colors.btnBack100,
  },
  profile2: {
    flex: 1,
  },
});
