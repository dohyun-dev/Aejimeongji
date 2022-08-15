import React, {useState, useEffect} from 'react';
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
import Profile from '../../components/Home/Profile';
import Running from '../../components/Home/Running';
import Navbar from './../../components/nav/Navbar';
import Place from '../../components/Home/Place';
import Guide from '../../components/Home/Guide';
import Todo from '../../components/Home/Todo';
import {useSelector} from 'react-redux';
import {getMemberId} from '../../utils/auth';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const url = 'http://i7d203.p.ssafy.io:8080';

const MainHome = ({navigation}) => {
  const [dogInfo, setDogInfo] = useState({});
  const [id, setId] = useState();

  const dogId = useSelector(state => state.profile.id);

  useEffect(() => {
    const getMember = async () => {
      const res = await getMemberId();

      axios
        .get(url + `/api/member/${res}/dog/${dogId}/profile`)
        .then(response => {
          console.log('reponse찍기');
          console.log(response);
          if (response.status == 200) {
            setDogInfo(response.data);
          } else {
            console.log(error.response + '회원정보받기에러');
          }
        });
    };
    getMember();
  }, []);

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Navbar imageName={dogInfo.imageName} />
        <View style={styles.contentbox}>
          <Profile dogInfo={dogInfo} />

          <View style={styles.guidebox}>
            <View style={styles.guidecontent}>
              <Image
                style={styles.notice}
                resizeMode="contain"
                source={require('../../Assets/image/notice-logo.png')}
              />
              <Text style={[styles.font, styles.font14, styles.line40]}>
                예방접종한 지 일년이 지났어요!
              </Text>
            </View>
          </View>

          <Running />

          <Todo />

          <Place />

          <Guide />
        </View>
      </View>
    </ScrollView>
  );
};
export default MainHome;

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

  rootContainer: {
    flex: 1,
    backgroundColor: Colors.back100,
  },

  contentbox: {
    flex: 14,
    justifyContent: 'center',
    backgroundColor: Colors.back100,
  },

  notice: {
    maxWidth: responsiveWidth(10),
    maxHeight: responsiveHeight(5),
  },

  guidebox: {
    height: responsiveHeight(10),
    alignSelf: 'center',
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(2),
    paddingRight: responsiveWidth(5),
    marginTop: responsiveHeight(-1),
    borderBottomColor: Colors.btnBack100,
    borderBottomWidth: 1,
  },
  guidecontent: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
