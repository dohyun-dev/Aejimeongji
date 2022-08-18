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
  const [isSelect, setSelect] = useState();
  const fetchDogId = () => {
    if (dogIds.includes(id) === true) {
      dogIds = dogIds.filter(item => item !== id);
      setSelect(false);
    } else {
      dogIds.push(id);
      setSelect(true);
    }
    setDogIds(dogIds);
    console.log(dogIds);

    // return (
    //   <Pressable
    //     style={[
    //       styles.buttonContainer,
    //       {backgroundColor: isSelect[id] ? 'green' : 'yellow'},
    //     ]}
    //     onPress={() => {
    //       setSelect([
    //         ...isSelect.slice(0, id),
    //         !isSelect[id],
    //         ...isSelect.slice(id + 1),
    //       ]);
    //     }}>
    //     <Text>Color Change Button</Text>
    //   </Pressable>
    // );
  };

  return (
    <TouchableOpacity onPress={fetchDogId}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={[styles.image, isSelect && styles.selected]}
          source={source}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            fontFamily: 'IBMPlexSansKR-Regular',
          }}>
          {name}
        </Text>
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
  selected: {
    opacity: 0.2,
  },
});
export default RunningSelect;
