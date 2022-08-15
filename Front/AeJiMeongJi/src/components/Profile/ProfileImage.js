import {Avatar} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import UploadModeModal from './UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileImage = ({visible, image, setImage}) => {
  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 230,
    maxHeight: 172,
    includeBase64: Platform.OS === 'android',
    saveToPhotos: true,
  };

  const [preview, setPreview] = useState(null);

  const requestCameraPermission = async () => {
    console.log('진입');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 접근 권한 요청',
          message:
            '반려견 사진을 찍으려면 카메라 접근 권한이 필요 합니다. ' +
            '접근을 허용하시겠어요?',
          buttonNeutral: '나중에 묻기',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      } else {
        Alert.alert('취소 되었습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onPickImage = async res => {
    if (res.didCancel || !res) {
      return;
    }

    setImage(res.assets[0]);
    setPreview(res.assets[0].uri);
    // setPreview(pickedImage)
  };
  const imageAddBtn = require('../../Assets/image/plusButton.png');
  const [modalVisible, setModalVisible] = useState(visible);

  const addPhotoHandler = () => {
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  const onLaunchCamera = async () => {
    // 여기서 camera permission 얻은 후 카메라 키기
    const res = await requestCameraPermission();
    if (res === 'granted') {
      await launchCamera(imagePickerOption, onPickImage);
    }
  };

  return (
    <>
      {modalVisible && (
        <UploadModeModal
          visible={modalVisible}
          onClose={closeModalHandler}
          onLaunchImageLibrary={onLaunchImageLibrary}
          onLaunchCamera={onLaunchCamera}
        />
      )}
      <View style={styles.ImgContainer}>
        <Avatar
          source={
            preview === null
              ? require('../../Assets/image/Profile.png')
              : {
                  uri: preview,
                  cache: 'reload',
                }
          }
          size={'xlarge'}
          activeOpacity={0.2}
          containerStyle={styles.Avatar}
          overlayContainerStyle={styles.Avatar}
        />
        {/* 사진 추가 */}
        <Pressable onPress={addPhotoHandler}>
          <Image source={imageAddBtn} style={styles.imageAddBtn} />
        </Pressable>
      </View>
    </>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  Avatar: {
    borderRadius: 90,
    width: responsiveWidth(40),
    height: responsiveWidth(40),
  },
  ImgContainer: {
    marginTop: responsiveHeight(10),
    position: 'relative',
  },
  imageAddBtn: {
    position: 'absolute',
    borderRadius: responsiveWidth(10),
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    left: responsiveWidth(30),
    bottom: 0,
  },
});
