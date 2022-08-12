import React, {useState, useEffect, useLayoutEffect} from 'react';
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
import {SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {MarkdownView} from 'react-native-markdown-view';
import Markdown from 'react-native-simple-markdown';
import axios from '../../utils/index';

axios.defaults.withCredentials = true;
const url = 'http://i7d203.p.ssafy.io:8080';
const imageurl = 'http://i7d203.p.ssafy.io:8080/api/image/';

const GuideCategory = props => {
  const navigation = useNavigation();
  console.log(props.route.params);
  const [categoryList, setCategoryList] = useState([]);
  const card = props.route.params;
  console.log(url + '/api/guide?category=' + props.route.params);

  useLayoutEffect(() => {
    const fetchCategory = async () => {
      const res = await axios(
        url + '/api/guide?category=' + props.route.params,
      );
      if (res) {
        setCategoryList(res.data);
      }
    };
    fetchCategory();
  }, []);

  const Item = ({title, thumbnail, guideId}) => (
    <TouchableOpacity
      style={styles.GuideBox}
      onPress={() => {
        navigation.navigate('GuideDetail', {guideId});
      }}>
      <View style={styles.infoBox}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2.6),
          }}>
          {title}
          {guideId}
        </Text>
      </View>
      <View style={styles.GuideImg}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 10}}
          source={{uri: `${imageurl}${thumbnail}`}}
          resizeMode="cover"
        />
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
    <ScrollView>
      <View style={styles.rootContainer}>
        <View style={styles.GuideTitle}>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              fontWeight: 'bold',
            }}>
            {card} 관련 가이드 모음!
          </Text>
        </View>

        <View>
          <FlatList
            data={categoryList}
            renderItem={renderItem}
            keyExtractor={item => item.id}></FlatList>

          <View style={styles.infoBox}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.6),
              }}>
              {categoryList[1]?.title}
            </Text>
          </View>
          <View style={styles.GuideImg}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 10}}
              source={{uri: imageurl + categoryList[1]?.thumbnail}}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: 1400,
  },
  GuideTitle: {
    marginVertical: responsiveHeight(2.8),
    alignItems: 'center',
  },
  GuideImg: {
    backgroundColor: 'orange',
    borderRadius: 20,
    height: responsiveHeight(12),
    width: responsiveWidth(25),
    marginRight: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  GuideBox: {
    backgroundColor: Colors.back200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: responsiveHeight(1.3),
    marginBottom: responsiveHeight(1.3),
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
    marginLeft: responsiveWidth(10),
  },
});
export default GuideCategory;
