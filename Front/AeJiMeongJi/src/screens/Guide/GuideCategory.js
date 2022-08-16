import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
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

import axios from '../../utils/index';
import {fetchMoreGuide} from '../../utils/guide';

axios.defaults.withCredentials = true;
const url = 'http://i7d203.p.ssafy.io:8080';
const imageurl = 'http://i7d203.p.ssafy.io:8080/api/image/';

const GuideCategory = props => {
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [curLastIdx, setCurLastIdx] = useState();
  const [loading, setLoading] = useState(false);
  const limit = 5;
  const loadMore = async () => {
    console.log('loadmore');
    if (loading) {
      return;
    }

    if (hasNext) {
      setLoading(true);

      const res = await fetchMoreGuide(props.route.params, curLastIdx, limit);
      const newData = res.data.data;
      setCategoryList([...categoryList, ...newData]);
      setHasNext(res.data.hasNext);
      setCurLastIdx(res.data.curLastIdx);
      setLoading(false);
    }
  };

  const renderLoader = () => {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  };

  const card = props.route.params;

  useLayoutEffect(() => {
    console.log('진입');
    const fetchCategory = async () => {
      const res = await axios(
        url + `/api/guide?category=${props.route.params}&limit=25`,
      );
      if (res) {
        console.log(res.data, '데이터');
        setCategoryList(res.data.data);
        setHasNext(res.data.hasNext);
        setCurLastIdx(res.data.curLastIdx);
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
            fontFamily: '강원교육튼튼',
            fontSize: responsiveFontSize(2.6),
          }}>
          {title}
        </Text>
      </View>
      <View style={styles.GuideImg}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 10}}
          source={thumbnail}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      guideId={item.guideId}
      thumbnail={
        item.thumbnail ? {uri: `${imageurl}${item.thumbnail}`} : item.sources
      }
    />
  );
  return (
    <View>
      <View style={styles.rootContainer}>
        <View style={styles.GuideTitle}>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              fontFamily: '강원교육튼튼',
            }}>
            {card} 관련 가이드 모음!
          </Text>
        </View>

        <View>
          <FlatList
            key={'#'}
            data={categoryList}
            renderItem={renderItem}
            // onEndReached={loadMore}
            numColumns={1}
            // ListFooterComponent={renderLoader}
            // onEndReachedThreshold={0.1}
            keyExtractor={item => item.id}></FlatList>
        </View>
      </View>
    </View>
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
  loaderStyle: {
    marginVertical: responsiveHeight(4),
    alignItems: 'center',
  },
});
export default GuideCategory;
