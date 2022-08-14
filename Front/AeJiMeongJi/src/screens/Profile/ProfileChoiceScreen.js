import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import ProfileItems from '../../components/Profile/ProfileItems';
import {Colors} from '../../constants/styles';
import Button from '../../components/ui/Button';
import {fetchDogs} from '../../utils/profile';
import {useNavigation} from '@react-navigation/native';
import CustomNav from '../../components/nav/CustomNav';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// 아이템을 parameter로 받아서 profileItems의 parameter로 넘겨줘야함.
const ProfileChoiceScreen = () => {
  // item을 flat list로 rendering
  // 강아지의 모든 정보를 조회 => 이미지를 렌더링
  // 첫 화면에는 무조건

  // 배열에 id를 저장하고, 그 저장한 것 바탕으로 이미지 다시 불러서 DummyData에 push

  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const url = 'http://i7d203.p.ssafy.io:8080/api/image/';

  const addProfileData = {
    source: require('../../Assets/image/Profile.png'),
    purpose: 'yes',
    name: '프로필 추가',
  };

  useEffect(() => {
    const fetchAlldogs = async () => {
      const res = await fetchDogs();
      if (res.length < 4) {
        res.push(addProfileData);
      }
      if (!res) {
        return;
      }
      setProfiles(res);
    };
    fetchAlldogs();
  }, []);
  console.log(profiles, '프로필');

  const renderItem = ({item}) => (
    <ProfileItems
      id={item.dogId}
      source={item.imageName ? {uri: `${url}${item.imageName}`} : item.source}
      purpose={item.purpose}
      isEditing={isEditing}
      name={item.name}
    />
  );

  const goToMyInfo = () => {
    // 여기서 비밀번호 컨펌
    navigation.navigate('MyInfo');
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <CustomNav isEditing={isEditing} setIsEditing={setIsEditing} screen='Choice'>
        {isEditing ? '프로필 편집' : '프로필 선택'}
      </CustomNav>
      <FlatList
        key={'#'}
        data={profiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.flatlist}
        columnWrapperStyle={{justifyContent: 'center', alignItems: 'center'}}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={goToMyInfo}>
          내 계정 관리
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileChoiceScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.back100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flexGrow: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(15),
  },
  button: {
    backgroundColor: '#EDCCA2',
    color: '#90560D',
    fontSize: responsiveFontSize(1.5),
    // fontWeight: 'bold',
    width: responsiveWidth(40),
  },
});
