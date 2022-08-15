import React, {useLayoutEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CategoryDummy from '../../components/Place/CategoryDummy';
import CategoryItem from '../../components/Place/CategoryItem';
import {Colors} from '../../constants/styles';
import {fetchCategoryPlace, fetchMoreData} from '../../utils/place';

const PlaceCategory = ({route}) => {
  console.log(route.params.lat);
  const [data, setData] = useState();
  const [hasNext, setHasNext] = useState(route.params.loadMoreData.hasNext);
  const [curLastIdx, setCurLastIdx] = useState(
    route.params.loadMoreData.curLastIdx,
  );
  const [loading, setLoading] = useState(false);
  const loadMore = async () => {
    console.log('loadmore');
    if (loading) {
      return;
    }

    if (hasNext) {
      setLoading(true);
      const res = await fetchMoreData(
        route.params.category,
        route.params.lat,
        route.params.lng,
        curLastIdx,
      );
      const newData = res.data;
      setData([...data, ...newData]);
      setHasNext(res.hasNext);
      setCurLastIdx(res.curLastIdx);
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

  useLayoutEffect(() => {
    const initialData = async () => {
      const res = await fetchCategoryPlace(
        route.params.category,
        route.params.lat,
        route.params.lng,
      );
      setData(res.data);
      setHasNext(res.hasNext);
      setCurLastIdx(res.curLastIdx);
    };
    initialData();
  }, []);

  const renderItem = ({item}) => (
    <CategoryItem
      source={{uri: item.petplaceThumbnail}}
      title={item.name}
      rating={item.rating}
      info={item.description}
      id={item.id}
      address={item.address}
    />
  );

  return (
    <>
      <View style={styles.headerLine}></View>
      <View style={styles.rootContainer}>
        <FlatList
          key={'#'}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={1}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderLoader}
        />
      </View>
    </>
  );
};

export default PlaceCategory;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.back100,
  },
  headerLine: {
    height: responsiveHeight(0.2),
    backgroundColor: '#DD9944',
  },
  loaderStyle: {
    marginVertical: responsiveHeight(4),
    alignItems: 'center',
  },
});
