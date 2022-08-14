import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';

const imageurl = 'http://i7d203.p.ssafy.io:8080/api/image/';
const SubCard = props => {
  const guide = props.category;
  // const guide1 = guide[1];
  const navigation = useNavigation();

  const Item = ({title, thumbnail, guideId}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GuideDetail', {guideId});
      }}>
      <View style={styels.GuideBox}>
        <View style={{flexDirection: 'row'}}>
          <View style={styels.GuideImg}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 15}}
              source={{uri: `${imageurl}${thumbnail}`}}
              resizeMode="center"
            />
          </View>
          <View>
            <View style={styels.infoBox}>
              <View style={styels.infoTitle}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.4),
                    fontFamily: '강원교육튼튼',
                  }}>
                  {title}
                </Text>
              </View>
              <View style={styels.infosum}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontFamily: 'IBMPlexSansKR-Regular',
                  }}>
                  지금 바로 알아보세요
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      guideId={item.guideId}
      source={
        item.thumbnail ? {uri: `${imageurl}${item.thumbnail}`} : item.sources
      }
    />
  );

  return (
    <View>
      <FlatList
        data={guide}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
};

const styels = StyleSheet.create({
  infoTitle: {},
  infosum: {
    marginTop: responsiveHeight(1),
  },
  GuideImg: {
    backgroundColor: 'orange',
    borderRadius: 30,
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    marginLeft: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
  },

  GuideBox: {
    backgroundColor: Colors.back200,
    borderRadius: 20,
    paddingVertical: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
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
    marginLeft: responsiveWidth(6),
    marginVertical: responsiveHeight(3.9),
  },
});
export default SubCard;
