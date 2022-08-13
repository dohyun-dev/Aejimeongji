import React from 'react';
import {FlatList, View} from 'react-native';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CategoryDummy from '../../components/Place/CategoryDummy';
import CategoryItem from '../../components/Place/CategoryItem';
import {Colors} from '../../constants/styles';

const PlaceCategory = ({route}) => {
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
      <ScrollView style={styles.rootContainer}>
        <FlatList
          key={'#'}
          data={route.params.placeData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={1}
        />
      </ScrollView>
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
});
