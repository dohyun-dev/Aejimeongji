import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {Colors} from '../../constants/styles';
import RunButton3 from '../../components/ui/RunButton3';
import RunningSelect from '../../components/Running/RunningSelect';
import {fetchDogs} from '../../utils/profile';
import {useDispatch} from 'react-redux';
import {profileActions} from '../../store/profile';

const RunningProfile = ({route, navigation}) => {
  const [profiles, setProfiles] = useState([]);
  const [dogIds, setDogIds] = useState([route.params.dogId]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchAlldogs = async () => {
      const res = await fetchDogs();
      const newArray = res.filter(item => item.dogId !== route.params.dogId);
      setProfiles(newArray);
    };
    fetchAlldogs();
  }, []);
  console.log(profiles, '프로필');

  console.log(dogIds, '업데이트 되는 값');

  const fetchDogIds = async () => {
    dispatch(profileActions.saveDogIds(dogIds));
    navigation.navigate('RunningGeolocation');
  };

  const url = 'http://i7d203.p.ssafy.io:8080/api/image/';
  const renderItem = ({item}) => (
    <RunningSelect
      id={item.dogId}
      name={item.name}
      source={{uri: `${url}${item.imageName}`}}
      setDogIds={setDogIds}
      dogIds={dogIds}
    />
  );
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.Title}>함께 산책가는 강아지가 있나요?</Text>
      <View style={styles.ProfileSelect}>
        <FlatList
          key={'#'}
          data={profiles}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          style={styles.flatlist}
          columnWrapperStyle={{justifyContent: 'center', alignItems: 'center'}}
        />
        <RunButton3 onPress={fetchDogIds} style={{width: responsiveWidth(10)}}>
          선택완료
        </RunButton3>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.back100,
    justifyContent: 'center',
  },
  Title: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.6),
    fontFamily: '강원교육튼튼',

    marginBottom: responsiveHeight(2),
  },
  ProfileSelect: {
    backgroundColor: Colors.back200,
    height: responsiveHeight(55),
    width: responsiveWidth(80),
    justifyContent: 'center',
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
  profileImg: {
    backgroundColor: 'orange',
    borderRadius: 130,
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    marginLeft: responsiveWidth(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
});

export default RunningProfile;
