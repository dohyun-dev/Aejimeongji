import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../constants/styles';
import {getDog} from '../../utils/profile';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const DogInfo = ({source, dogInfo}) => {
  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: source}}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{dogInfo?.name}</Text>
          </View>
          <View style={styles.recommendTextContainer}>
            <Text style={styles.recommendText}>
              함께 가요!
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DogInfo;

const styles = StyleSheet.create({
  infoContainer: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.back100,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(5)
  },
  imageContainer: {
    paddingRight: 16,
    paddingBottom: 16,
    marginRight: 8,
  },
  image: {
    width: responsiveWidth(27),
    height: responsiveWidth(27),
    borderRadius: 100,
    borderColor: Colors.contentText,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 16,
    paddingRight: responsiveWidth(25),
  },
  nameContainer: {
    paddingVertical: 8,
  },
  name: {
    fontSize: responsiveFontSize(3.5),
    // fontWeight: 'bold',
    color: 'black',
    fontFamily: '강원교육튼튼',
  },
  recommendTextContainer: {
    flex: 1,
  },
  recommendText: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontFamily: 'IBMPlexSansKR-Regular',
  },
});
