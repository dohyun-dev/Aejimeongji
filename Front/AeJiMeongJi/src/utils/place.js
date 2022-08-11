import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './index';
import jwt_decode from 'jwt-decode';
import {Alert} from 'react-native';
import {getMemberId} from './auth';

export const searchPlace = async address => {
  const temp = '';
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

    console.log(res.data);

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
