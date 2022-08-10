import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
    maxWidth: '20%',
    maxHeight: '100%',
  },

  guidebox: {
    height: 70,
    alignSelf: 'center',
    width: '80%',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 20,
    marginTop: -10,
    borderBottomColor: Colors.btnBack100,
    borderBottomWidth: 1,
  },
  guidecontent: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
