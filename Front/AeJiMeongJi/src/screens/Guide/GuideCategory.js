import React from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {SafeAreaView, ScrollView} from 'react-native';

const SubCard = ({information}) => {
  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <View style={styles.GuideTitle}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            가이드 정보가 들어갈 예정{information ? information : '없어'}
          </Text>
        </View>
        <View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
          <View style={styles.GuideBox}>
            <View>
              <View style={styles.infoBox}>
                <View style={styles.infoTitle}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    여름철 강아지 건강정보
                  </Text>
                </View>
                <View style={styles.infosum}>
                  <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
                </View>
              </View>
            </View>
            <View style={styles.GuideImg}>
              {/* <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="cover"
          /> */}
              <Text>이미지</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoTitle: {},
  infosum: {
    marginTop: 0,
  },
  rootContainer: {
    height: 1400,
  },
  GuideTitle: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  GuideImg: {
    backgroundColor: 'orange',
    borderRadius: 20,
    height: 90,
    width: 90,
    marginLeft: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  GuideBox: {
    backgroundColor: Colors.back200,
    flexDirection: 'row',
    borderRadius: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 7,
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
    marginLeft: 40,
    marginTop: 22,
    marginBotton: 20,
  },
});
export default SubCard;
