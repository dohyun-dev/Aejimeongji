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
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={styels.infoBox}>
              <View style={styels.infoTitle}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>{title}</Text>
              </View>
              <View style={styels.infosum}>
                <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
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

      {/* <View style={styels.GuideBox}>
        <View style={{flexDirection: 'row'}}>
          <View style={styels.GuideImg}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 15}}
              source={{uri: imageurl + guide[1]?.thumbnail}}
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={styels.infoBox}>
              <View style={styels.infoTitle}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  {guide[1]?.title}
                </Text>
              </View>
              <View style={styels.infosum}>
                <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styels.GuideBox}>
        <View style={{flexDirection: 'row'}}>
          <View style={styels.GuideImg}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 15}}
              source={{uri: imageurl + guide[2]?.thumbnail}}
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={styels.infoBox}>
              <View style={styels.infoTitle}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  {guide[2]?.title}
                </Text>
              </View>
              <View style={styels.infosum}>
                <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styels.GuideBox}>
        <View style={{flexDirection: 'row'}}>
          <View style={styels.GuideImg}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 15}}
              source={{uri: imageurl + guide[3]?.thumbnail}}
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={styels.infoBox}>
              <View style={styels.infoTitle}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  {guide[3]?.title}
                </Text>
              </View>
              <View style={styels.infosum}>
                <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styels.GuideBox}>
        <View style={{flexDirection: 'row'}}>
          <View style={styels.GuideImg}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 15}}
              source={{uri: imageurl + guide[4]?.thumbnail}}
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={styels.infoBox}>
              <View style={styels.infoTitle}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  {guide[4]?.title}
                </Text>
              </View>
              <View style={styels.infosum}>
                <Text style={{fontSize: 12}}>지금 바로 알아보세요</Text>
              </View>
            </View>
          </View>
        </View>
      </View> */}
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
