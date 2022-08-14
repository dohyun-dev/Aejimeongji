import {Avatar} from '@rneui/base';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import {SvgUri} from 'react-native-svg';
import { SafeAreaView } from 'react-native';

const hasTags = ({item}) => {
  return (
    <SafeAreaView style={styles.hashTagContainer}>
      <Text style={styles.hashTag}>#{item} </Text>
    </SafeAreaView>
  );
};
const Review = ({item}) => {
  console.log(item);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.reviewerContainer}>
            <SvgUri
            width={responsiveWidth(8)}
            height={responsiveHeight(8)}
            uri="https://source.boringavatars.com/beam"
          />
        <Text style={styles.reviewer}>{item.reviewer}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View>
          <Text>{item.content}</Text>
        </View>
        <View>
          <FlatList
            data={item.hashTags}
            renderItem={hasTags}
            horizontal={true}
          />
        </View>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.back200,
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(10)
  },
  reviewerContainer: {
    flexDirection: 'row',
    padding: responsiveWidth(2),
    marginHorizontal: responsiveWidth(8),
  },
  reviewer: {
    fontWeight: 'bold',
    marginTop: responsiveWidth(5),
    marginLeft: responsiveWidth(5),
  },
  contentContainer: {
    width: responsiveWidth(70),
    marginHorizontal: responsiveWidth(10),
  },
  hashTag: {
    color: '#1a6ddf',
    fontSize: responsiveFontSize(1.4),
  },
  date: {
    fontSize: responsiveFontSize(1),
  },
  margin: responsiveHeight(4)
});
