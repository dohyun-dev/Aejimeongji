import React, {useLayoutEffect, useState} from 'react';
import ProfileInput from '../../components/Profile/ProfileInput';
import Button from '../../components/ui/Button';
import {Button as Btn} from '@rneui/themed';
import {Alert, Modal, SafeAreaView, StyleSheet} from 'react-native';
import {changeProfile, getProfile} from '../../utils/profile';
import {Colors} from '../../constants/styles';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {removeMember} from '../../utils/auth';
import {authActions} from '../../store/auth';
import ProfileModal from '../../components/Profile/ProfileModal';
import CustomNav from '../../components/nav/CustomNav';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const MyInfoScreen = () => {
  const dogId = useSelector(state => state.id);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    phoneNumber: '',
    createdDate: '',
    password: '',
  });
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    const initialValue = async () => {
      const res = await getProfile();
      setUserInfo(res);
      console.log(userInfo, '인포');
    };
    initialValue();
  }, []);

  const fetchChangedInfo = async () => {
    if (visible) {
      await changeProfile(userInfo);
      navigation.navigate('Home', dogId);
      return;
    }

    setVisible(true);

    const res = await changeProfile(userInfo.nickname);

    if (res) {
      Alert.alert('프로필이 변경 되었습니다.');
      navigation.replace('Home');
    }
  };

  const closeModalHandler = () => {
    setVisible(false);
  };

  const changeInfoHandler = async (identifier, enteredValue) => {
    setUserInfo(curValue => {
      return {
        ...curValue,
        [identifier]: enteredValue,
      };
    });
  };

  const confirmRemoveMember = async () => {
    const res = await removeMember();
    if (res) {
      Alert.alert(res);
      dispatch(authActions.deleteMember);
      navigation.navigate('Welcome');
    }
  };
  const removeMemberHandler = async () => {
    Alert.alert('정말 탈퇴 하시겠어요?', '', [
      {
        text: '아니요',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: '네', onPress: confirmRemoveMember},
    ]);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ProfileModal
        visible={visible}
        setVisible={setVisible}
        changeInfoHandler={changeInfoHandler}
        fetchChangedInfo={fetchChangedInfo}
        userInfo={userInfo}
        closeModalHandler={closeModalHandler}
      />
      <CustomNav>내 계정</CustomNav>
      <ProfileInput
        textInputConfig={{
          placeholder: userInfo.email,
          editable: false,
          placeholderTextColor: '#6D6D6D',
        }}
      />
      <ProfileInput
        textInputConfig={{
          placeholder: userInfo.nickname,
          placeholderTextColor: '#6D6D6D',
          onChangeText: changeInfoHandler.bind(this, 'nickname'),
          value: userInfo.nickname,
          autoFocus: true,
        }}
      />
      <ProfileInput
        textInputConfig={{
          placeholder: userInfo.phoneNumber,
          editable: false,
          placeholderTextColor: '#6D6D6D',
        }}
      />
      <ProfileInput
        textInputConfig={{
          placeholder: userInfo.createdDate.slice(0, 10),
          editable: false,
          placeholderTextColor: '#6D6D6D',
        }}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={fetchChangedInfo} style={styles.button}>
          프로필 변경
        </Button>
      </View>
      <View style={styles.btnContainer}>
        <Btn
          title="회원탈퇴"
          buttonStyle={{backgroundColor: Colors.back100}}
          titleStyle={styles.btn}
          onPress={removeMemberHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyInfoScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.back100,
  },

  buttonContainer: {
    marginTop: responsiveHeight(5),
  },
  btnContainer: {
    marginTop: responsiveHeight(2)
  },
  btn: {
    color: '#90560D',
    fontFamily: 'IBMPlexSansKR-Regular',
  },
  button: {
    paddingHorizontal: 20,
  },
});
