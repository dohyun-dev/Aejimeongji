import React, {useLayoutEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import PlaceNavbar from '../../components/nav/PlaceNavbar';
import ConnectMyInfo from '../../components/Profile/ConnectMyInfo';
import LikeGuide from '../../components/Profile/LikeGuide';
import MyPageLiked from '../../components/Profile/MyPageLiked';
import NoGuide from '../../components/Profile/NoGuide';
import {Colors} from '../../constants/styles';
import {fetchLikedPlace} from '../../utils/place';
import {fetchLikedGuide, getDog} from '../../utils/profile';

const MyPage = () => {
  const [place, setPlace] = useState(true);
  const [guide, setGuide] = useState(true);
  const [source, setSource] = useState();
  const dogId = useSelector(state => state.profile.id);
  const [dogName, setDogName] = useState();

  useLayoutEffect(() => {
    const fetchInitialData = async () => {
      const likedGuide = await fetchLikedGuide();
      const likedPlace = await fetchLikedPlace();
      const res = await getDog(dogId);
      console.log(likedPlace);
      console.log(likedGuide);
      setDogName(res.name);
      setGuide(likedGuide.data);
      setPlace(likedPlace.data);
      setSource(`http://i7d203.p.ssafy.io:8080/api/image/${res.imageName}`);
    };
    fetchInitialData();
  }, []);

  return (
    <ScrollView style={styles.rootContainer}>
      <PlaceNavbar source={source}>MyPage</PlaceNavbar>
      <View style={styles.ConnectMyInfo}>
        <ConnectMyInfo dogName={dogName} />
      </View>
      {place ? (
        <View style={styles.likedContainer}>
          <Text style={styles.likedTitle}> 즐겨찾기 한 장소 목록 </Text>
          <MyPageLiked data={place} screen="PlaceDetail" />
        </View>
      ) : (
        <View style={styles.noGuideContainer}>
          {!place && <NoGuide navigate="PlaceHome">장소</NoGuide>}
        </View>
      )}
      {guide ? (
        <View style={styles.likedContainer}>
          <Text style={styles.likedTitle}> 즐겨찾기 한 가이드 목록 </Text>
          <MyPageLiked data={guide} />
        </View>
      ) : (
        <View style={styles.noGuideContainer}>
          {!guide && <NoGuide navigate="Guide">가이드</NoGuide>}
        </View>
      )}
      {/* <View>
        <Text style={styles.likedTitle}> 즐겨찾기 한 장소 목록 </Text>
        <FlatList
          contentContainerStyle={styles.guideContainer}
          key={'#'}
          data={place}
          renderItem={LikeGuide}
        />
      </View>
      <View>
        <Text style={styles.likedTitle}> 즐겨찾기 한 가이드 목록 </Text>
        <FlatList
          contentContainerStyle={styles.guideContainer}
          key={'#'}
          data={guide}
          renderItem={LikeGuide}
        />
      </View> */}
    </ScrollView>
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
  likedTitle: {
    marginBottom: responsiveHeight(2),
    marginLeft: responsiveWidth(4),
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  noGuideContainer: {
    // position: 'absolute',
    // top: responsiveHeight(40),
    // left: responsiveWidth(10),
    alignItems: 'center',
    marginVertical: responsiveHeight(4),
  },
  guideContainer: {
    alignItems: 'center',
  },
  likedContainer: {
    marginVertical: responsiveHeight(2),
  },
});
