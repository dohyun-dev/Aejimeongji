import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './index';
import jwt_decode from 'jwt-decode';
import {Alert} from 'react-native';
import {getMemberId} from './auth';

const url = 'http://i7d203.p.ssafy.io:8080';

export const searchPlace = async address => {
  const path = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`;
  try {
    const res = await axios({
      method: 'get',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': 'eaxp3i0xat',
        'X-NCP-APIGW-API-KEY': 'ZwCWb3Gsb7nPIMxF4YU7W5iynkQtUCtCcNFINapn',
      },
      url: path,
    });

    return res.data.addresses[0];
  } catch (error) {
    console.log(error.response);
  }
};

// export const getPlaceImage = async (y, x) => {
//   const path = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=127.1054221,37.3591614&level=16`;
//   try {
//     const res = await axios({
//       method: 'get',
//       headers: {
//         'X-NCP-APIGW-API-KEY-ID': 'eaxp3i0xat',
//         'X-NCP-APIGW-API-KEY': 'ZwCWb3Gsb7nPIMxF4YU7W5iynkQtUCtCcNFINapn',
//       },
//       url: path,
//     });
//     console.log(res);

//     return res
//   } catch (error) {
//     console.log(error.response);
//   }
// };

// export const getAvatar = async () => {
//   const path = 'https://source.boringavatars.com/'

//   const res = await axios({
//     method:'get',
//     url: path,
//   })

//   console.log(res.data);
// };

export const fetchPlace = async (category, lat2, lng2) => {
  console.log(category, 'category');
  const lat = 36.1064013;
  const lng = 128.429;
  const dist = 200;
  const limit = 10;
  const path = `/api/petplace?category=${category}&dist=${dist}&lat=${lat}&limit=${limit}&lng=${lng}`;

  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryPlace = async (category, lat2, lng2) => {
  const lat = 36.1064013;
  const lng = 128.429;
  const dist = 100;
  const limit = 3;
  const path = `/api/petplace?category=${category}&dist=${dist}&lat=${lat}&limit=${limit}&lng=${lng}`;
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlaceDetail = async petplaceId => {
  const path = `/api/petplace/${petplaceId}`;

  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchReviews = async petplaceId => {
  const id = 101;
  const path = `/api/petplace/${id}/reviews`;
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
    console.log(res.data, 'review');
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchMoreData = async (category, lat2, lng2, curLastIdx) => {
  const lat = 36.1064013;
  const lng = 128.429;
  const dist = 1000;
  const limit = 3;
  const path = `/api/petplace?category=${category}&curLastIdx=${curLastIdx}&limit=${limit}&dist=${dist}&lat=${lat}&lng=${lng}`;
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchLiked = async (liked, petplaceId) => {
  const memberId = await getMemberId();
  const method = !liked ? 'delete' : 'post';
  const path = `/api/petplace/${petplaceId}/member/${memberId}/bookmark`;
  try {
    const res = await axios({
      method,
      url: url + path,
      data: {
        memberId,
        petplaceId,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchLikedPlace = async () => {
  const memberId = await getMemberId();
  const path = `/api/petplace/member/${memberId}`;
  try {
    const res = await axios({
      method: 'get',
      url: url + path,
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};
