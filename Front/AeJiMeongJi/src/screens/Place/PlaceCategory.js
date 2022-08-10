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
        source={item.source}
        title={item.title}
        rating={item.rating}
        info={item.info}
        />
    )

  return (
    <>
      <View style={styles.headerLine}></View>
      <ScrollView style={styles.rootContainer}>
        <FlatList
          key={'#'}
          data={CategoryDummy}
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
