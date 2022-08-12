import React, {useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import PlaceNavbar from '../../components/nav/PlaceNavbar';
import ConnectMyInfo from '../../components/Profile/ConnectMyInfo';
import LikeGuide from '../../components/Profile/LikeGuide';
import NoGuide from '../../components/Profile/NoGuide';
import {Colors} from '../../constants/styles';
import {fetchLikedGuide, getDog} from '../../utils/profile';

const MyPage = () => {
  const [guide, setGuide] = useState();
  const [source, setSource] = useState();
  const dogId = useSelector(state => state.profile.id);
  const [dogName, setDogName] = useState();

  useLayoutEffect(() => {
    const fetchInitialData = async () => {
      // const res = await fetchLikedGuide();

      const res = await getDog(dogId);
      // console.log(res);
      setDogName(res.name);
      setSource(`http://i7d203.p.ssafy.io:8080/api/image/${res.imageName}`);
      // console.log(res, 'guide');
    };
    fetchInitialData();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <PlaceNavbar source={source}>MyPage</PlaceNavbar>
      <View style={styles.ConnectMyInfo}>
        <ConnectMyInfo dogName={dogName} />
      </View>
      <View style={styles.noGuideContainer}>{!guide && <NoGuide />}</View>
      <View>{guide && <FlatList data={guide} renderItem={LikeGuide} />}</View>
    </View>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.back100,
  },
  ConnectMyInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGuideContainer: {
    position: 'absolute',
    top: responsiveHeight(40),
    left: responsiveWidth(10),
  },
});
