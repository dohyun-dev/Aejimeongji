import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const LikeGuide = ({item}) => {
  return (
    <>
      <View style={styles.guideContainer}>
        <Text>즐겨찾기 한 애견 가이드</Text>
        <View styles={styles.guide}></View>
      </View>
    </>
  );
};

export default LikeGuide;

const styles = StyleSheet.create({
  guideContainer: {
    
  },
  guide: {
    height: responsiveHeight(3),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2),
  },
});
