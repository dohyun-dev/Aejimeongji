import React from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';

const SubCard = () => {
  return (
    <View style={styels.GuideBox}>
      <View style={{flexDirection: 'row'}}>
        <View style={styels.GuideImg}>
          {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
          <Text>이미지 들어갈 곳</Text>
        </View>
        <View>
          <View style={styels.infoBox}>
            <View style={styels.infoTitle}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                여름철 강아지 건강정보
              </Text>
            </View>
            <View style={styels.infosum}>
              <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styels = StyleSheet.create({
  infoTitle: {},
  infosum: {
    marginTop: 10,
  },
  GuideImg: {
    backgroundColor: 'orange',
    borderRadius: 30,
    height: 110,
    width: 110,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  GuideBox: {
    backgroundColor: Colors.back200,
    borderRadius: 20,
    paddingBottom: 15,
    paddingTop: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  infoBox: {
    marginLeft: 23,
    marginTop: 30,
    marginBotton: 20,
  },
});
export default SubCard;
