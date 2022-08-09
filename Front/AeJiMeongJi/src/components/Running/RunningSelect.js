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
    height: 130,
    width: 130,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
export default RunningSelect;
