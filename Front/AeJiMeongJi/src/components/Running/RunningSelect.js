import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const RunningSelect = ({id, source}) => {
  return (
    <View style={styles.profileImg}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={source}
        resizeMode="cover"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  profileImg: {
    backgroundColor: 'orange',
    borderRadius: 130,
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    marginHorizontal: responsiveWidth(14),
    marginVertical: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RunningSelect;
