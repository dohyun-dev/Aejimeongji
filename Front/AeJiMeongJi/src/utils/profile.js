import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './index';
import jwt_decode from 'jwt-decode';
import {Alert} from 'react-native';
import {getMemberId} from './auth';

// import axios from 'axios';

const url = 'http://i7d203.p.ssafy.io:8080';

export const fetchBreed = async () => {
  const path = '/api/breed';

  try {
    const res = await axios({
      method: 'GET',
      url: url + path,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchDog = async ({
  adoptionDay,
  birthday,
  breed,
  gender,
  name,
  neutering,
  weight,
  gone,
  image,
}) => {
  const jwt = await AsyncStorage.getItem('token');
  const decodedJwt = jwt_decode(jwt);
  const memberId = decodedJwt.memberId;

  const path = `/api/member/${memberId}/dog`;
  const request = {
    adoptionDay,
    birthday,
    breed,
    gender,
    name,
    neutering,
    weight,
    gone,
  };

  const formData = new FormData();
  formData.append('name', name);
  formData.append('weight', weight);
  formData.append('birthday', birthday);
  formData.append('adoptionDay', adoptionDay);
  formData.append('gender', gender);
  formData.append('neutering', neutering);
  formData.append('gone', gone);
  formData.append('breed', breed);

  formData.append('request', JSON.stringify(request), {
    type: 'application/json',
  });

  const data = {
    uri: image.uri,
    name: 'abcd.jpg',
    type: 'multipart/form-data', // or photo.type
  };

  formData.append('image', data);

  formData.append('image', {
    name: image.uri,
    type: 'multipart/form-data',
    uri: image.uri,
  });

  try {
    const res = await axios({
      method: 'POST',
      url: url + path,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: formData => {
        return formData;
      },
      data: formData,
    });
    return res.data.dogId;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchDogImage = async (id, image) => {
  const newImage = image.replace('file://', '');
  const dogId = id;
  const jwt = await AsyncStorage.getItem('token');
  const decodedJwt = jwt_decode(jwt);
  const memberId = decodedJwt.memberId;
  const path = `/api/member/${memberId}/dog/${dogId}/profileimage`;

  const formData = new FormData();
  console.log(image);
  formData.append('image', {
    name: image,
    type: 'image/jpeg',
    uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
  });
  console.log(formData);
  try {
    const res = await axios({
      method: 'POST',
      url: url + path,
      formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res, 'image에러');
    return res;
  } catch (error) {
    console.log(error.message, '에러');
  }
};
// export const fetchDogImage = async image => {
//   // const newImage = image.replace('file://', '');
//   console.log(image);
//   const jwt = await AsyncStorage.getItem('token');
//   const decodedJwt = jwt_decode(jwt);
//   const memberId = decodedJwt.memberId;
//   const path = `/api/member/4/dog/52/profileimage`;

//   const formData = new FormData();
//   console.log(image);
//   formData.append('image', {
//     name: image.uri,
//     type: 'image/jpeg',
//     uri: image.uri,
//   });
//   console.log(formData, '이거');
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: url + path,
//       data: formData,
//       headers: {
//         // Accept: 'application/json',
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log(res, 'image에러');
//     return res;
//   } catch (error) {
//     console.log(error.message, '에러');
//   }
// };
// export const fetchDogImage = async image => {
//   // const newImage = image.replace('file://', '');
//   console.log(image);
//   // const dogId = id;
//   const jwt = await AsyncStorage.getItem('token');
//   const decodedJwt = jwt_decode(jwt);
//   const memberId = decodedJwt.memberId;
//   const path = `/api/member/${memberId}/dog/${dogId}/profileimage`;

//   const formData = new FormData();
//   console.log(image);
//   formData.append('image', {
//     name: image.uri,
//     type: 'image/jpeg',
//     uri: image.uri,
//   });
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: url + path,
//       data: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log(res, 'image에러');
//     return res;
//   } catch (error) {
//     console.log(error.message, '에러');
//   }
// };

export const getDogImage = async () => {
  // 이미지의 pk를 불러와야함.

  const path = '';
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
  } catch (error) {}
};

export const getProfile = async () => {
  const memberId = await getMemberId();
  console.log(memberId);
  const path = `/api/member/${memberId}/profile`;
  console.log('getprofile');
  try {
    const res = await axios({
      method: 'GET',
      url: url + path,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const changeProfile = async ({nickname, password, phoneNumber}) => {
  const jwt = await AsyncStorage.getItem('token');
  const decodedJwt = jwt_decode(jwt);
  const memberId = decodedJwt.memberId;
  const path = `/api/member/${memberId}`;

  try {
    const res = await axios({
      method: 'PUT',
      url: url + path,
      data: {
        nickname,
        password,
        phoneNumber,
      },
    });
    return res;
  } catch (error) {
    console.log(error.response);
  }
};

export const getImage = async imageName => {
  const path = `/api/image/${imageName}`;
  // console.log(imageName, '진입');
  // console.log(url+path);
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
      // responseType:'blob',
    });
    // console.log(res);
    // console.log(res.data, typeof(res.data), new Blob([res.data]));
    // const blob = new Blob([res.data])
    // console.log(blob, '여기');
    // const img = URL.createObjectUrl(blob)

    // const reader = new FileReader();
    // reader.readAsDataURL(res)

    console.log(res.data, '이미지요청');

    return res.data;
  } catch (error) {
    console.log(error, 'img 못부러옴');
  }
};

// 사용자의 강아지 전체 목록
export const fetchDogs = async () => {
  const memberId = await getMemberId();
  const path = `/api/member/${memberId}/dog`;
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });

    const ids = [];

    // if (res.data) {
    //   res.data.forEach(element => {
    //     ids.push(element.dogId);
    //   });
    // }
    console.log(res.data, '프로필 호출');

    return res.data;
  } catch (error) {
    console.log(error.response, '강아지 목록 불러오지 못함.');
  }
};

export const getDog = async dogId => {
  const memberId = await getMemberId();
  console.log(dogId, 'dogid');
  console.log(memberId, 'memberId');
  const path = `/api/member/${memberId}/dog/${dogId}/profile`;
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = async dogId => {
  const memberId = await getMemberId();
  const path = `/api/member/${memberId}/dog/${dogId}`;

  try {
    const res = axios({
      method: 'delete',
      url: url + path,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const changeDogInfo = async ({
  dogId,
  name,
  weight,
  birthday,
  adoptionDay,
}) => {
  const memberId = getMemberId();
  const path = `/api/member/${memberId}/dog/${dogId}`;

  try {
    const res = axios({
      method: 'put',
      url: url + path,
      data: {
        name,
        weight,
        birthday,
        adoptionDay,
      },
    });
    return res;
  } catch (error) {
    console.log(error.response);
  }
};

export const changeDogPhoto = async ({dogId, image}) => {
  const memberId = await getMemberId();
  console.log(memberId);
  const path = `/api/member/${memberId}/dog/${dogId}/profileimage`;
  const formData = new FormData();

  const data = {
    uri: image,
    name: 'abcd.jpg',
    type: 'multipart/form-data', // or photo.type
  };
  formData.append('image', data);

  try {
    const res = await axios({
      method: 'put',
      url: url + path,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: formData => {
        console.log(formData, 'form');
        return formData;
      },
      data: formData,
    });

    return res;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchLikedGuide = async () => {
  const memberId = await getMemberId()
  const path=`/api/guide?member=${memberId}`

  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    })
    return res.data

  } catch (error) {
    console.log(error.response);
  }
}