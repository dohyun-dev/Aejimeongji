import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../constants/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const RunningSelect = ({id, source, name, setDogIds, dogIds}) => {
  console.log(id, '현재 접속한  id');
  console.log(name);
  const [dogId, setDogId] = useState([id]);
  const fetchDogId = () => {
    if (dogIds.includes(id) === true) {
      dogIds = dogIds.filter(item => item !== id);
    } else {
      dogIds.push(id);
    }
    setDogIds(dogIds);
  };
  return (
    <TouchableOpacity onPress={fetchDogId}>
      <View style={{alignItems: 'center'}}>
        <Image style={styles.image} source={source} resizeMode="cover" />
        <Text>{name}</Text>
        <Text>{id}</Text>
      </View>
    </TouchableOpacity>
  );
};
console.log();
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
  image: {
    height: responsiveHeight(16),
    width: responsiveWidth(32),
    borderRadius: 200,
    borderColor: Colors.contentText,
    borderWidth: 2,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RunningSelect;
