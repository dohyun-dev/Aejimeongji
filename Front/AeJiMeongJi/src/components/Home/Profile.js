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
                width: '80%',
                height: '80%',
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
            width: '100%',
            height: '100%',
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
    fontFamily: 'ONE Mobile POP',
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

  profile: {
    flex: 1.3,
    height: 150,
    marginTop: 60,
    marginBottom: 20,
    alignSelf: 'center',
    width: '80%',
    flexDirection: 'row',
  },
  profile1: {
    flex: 1,
    width: '50%',
    padding: 10,
  },
  profile1sub1: {
    flex: 2.5,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.contentBox,
    borderColor: Colors.btnBack100,
    borderWidth: 2,
    flexDirection: 'row',
  },
  name1: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
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
    fontSize: 31,
    lineHeight: 40,
    letterSpacing: 4,
    color: Colors.btnBack100,
  },
  profile2: {
    flex: 1,
  },
});
