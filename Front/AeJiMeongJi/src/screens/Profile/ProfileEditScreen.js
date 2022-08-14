import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../../components/ui/Button';
import {Button as Btn} from '@rneui/themed';
import ProfileInput from '../../components/Profile/ProfileInput';
import {Colors} from '../../constants/styles';
import Weight from '../../components/Profile/Weight';
import {useNavigation} from '@react-navigation/native';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import UploadModeModal from '../../components/Profile/UploadModeModal';
import {
  changeDogPhoto,
  deleteProfile,
  getDog,
} from '../../utils/profile';

const ProfileEditScreen = ({route}) => {
  const navigation = useNavigation();
  const url = 'http://i7d203.p.ssafy.io:8080/api/image/';
  const [dogInfo, setDogInfo] = useState({
    dogId: route.params.dogId,
    name: '',
    weight: '',
    birthday: '',
    adoptionDay: '',
    breedName: '',
    imageName: '',
    image: '',
  });
  const [source, setSource] = useState();
  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 230,
    maxHeight: 172,
    includeBase64: Platform.OS === 'android',
    saveToPhotos: true,
  };
  const onPickImage = async res => {
    if (res.didCancel || !res) {
      return;
    }

    setSource(res.assets[0].uri);
  };
  const deleteProfileHandler = async () => {
    const message = await deleteProfile(dogInfo.dogId);
    Alert.alert(message, [
      {text: '네', onPress: () => navigation.navigate('Choice')},
    ]);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const closeModalHandler = () => {
    setModalVisible(false);
  };
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };
  const onLaunchCamera = async () => {
    await launchCamera(imagePickerOption, onPickImage);
  };
  const changePhotoHandler = async () => {
    setModalVisible(true);
  };

  const inputChangeHandler = (inputIdentifier, enterdValue) => {
    setDogInfo(curValue => {
      return {
        ...curValue,
        [inputIdentifier]: enterdValue,
      };
    });
  };

  const submitHandler = async () => {
    // const res = await changeDogInfo(dogInfo);
    // if (res) {
    // }
    await changeDogPhoto({dogId: dogInfo.dogId, image: source});
  };

  useEffect(() => {
    // 강아지 이미지 및 프로필 조회
    const setInitialData = async () => {
      const res = await getDog(dogInfo.dogId);
      setDogInfo(res);
      setSource(`${url}${res.imageName}`);
      // await refresh()
      return res;
    };
    setInitialData();
  }, []);
  console.log(dogInfo);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        {modalVisible && (
          <UploadModeModal
            visible={modalVisible}
            onClose={closeModalHandler}
            onLaunchImageLibrary={onLaunchImageLibrary}
            onLaunchCamera={onLaunchCamera}
          />
        )}
        <Pressable onPress={changePhotoHandler}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: source, cache: 'reload'}}
          />
        </Pressable>
        <View style={styles.profileInputContainer}>
          <ProfileInput
            textInputConfig={{
              placeholder: dogInfo.name,
              placeholderTextColor: '#6D6D6D',
              value: dogInfo.name,
            }}
            style={styles.profileInput}
          />
        </View>
      </View>
      <View style={styles.inputsContainer}>
        <ProfileInput
          textInputConfig={{
            placeholder: dogInfo.birthday,
            placeholderTextColor: '#6D6D6D',
            value: dogInfo.birthday,
          }}
          style={styles.inputs}
        />
        <ProfileInput
          textInputConfig={{
            placeholder: dogInfo.breedName,
            placeholderTextColor: '#6D6D6D',
            value: dogInfo.breedName,
          }}
          style={styles.inputs}
        />
      </View>
      <View style={styles.weightBox}>
        <Text style={styles.subTitle}>몸무게</Text>
        <Weight
          weight={dogInfo.weight}
          setWeight={inputChangeHandler.bind(this, 'weight')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={submitHandler}>
          적용
        </Button>
        <Btn
          title="프로필 삭제 하기"
          onPress={deleteProfileHandler}
          buttonStyle={{backgroundColor: Colors.back100}}
          titleStyle={styles.btn}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.back100,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 80,
  },
  profileInputContainer: {
    justifyContent: 'center',
  },
  profileInput: {
    width: '15%',
    marginLeft: 20,
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'center',
    flexGrow: 0.5,
    marginVertical: 16,
  },
  inputs: {
    marginVertical: 8,
  },
  image: {
    width: 132,
    height: 132,
    borderRadius: 100,
    borderColor: Colors.contentText,
    borderWidth: 2,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightBox: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexGrow: 0.5,
  },
  subTitle: {
    color: '#90560D',
    fontSize: 13,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 200,
  },
  btn: {
    color: '#90560D',
    marginTop: 16,
  },
});
