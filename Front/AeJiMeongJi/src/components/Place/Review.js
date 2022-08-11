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

export const reviewData = [
  {
    reviewer: '헤오28',
    content:
      '방2개 있는 1층 이용했는데 인테리어도 사진보다 더 이쁘고 방도 화장실도 커서 너무 좋았습니다 정원 관리도 너무 잘하셔서 꽃도 이쁘고 사진 찍기도 좋았구요 조용히 쉬고 오기에는 딱 좋은 펜션입니다 덕분에 하루밤 편히 잘 보냈습니다! ^^',
    date: '2022-06-10',
    hash_tags: [
      '깨끗해요',
      '화장실이 잘 되어있어요',
      '인테리어가 멋져요',
      '조용히 쉬기 좋아요',
      '친절해요',
    ],
  },
  {
    reviewer: '호호아줌마3962',
    content:
      '조용하고 뷰가. 이삐요~아침에 새소리도 좋았구요~~강아지 데리고 방문했어요\n다른곳에서 3박하고 여기2박\n다른것은 다 좋은데 계단이 있음 좋을듯해요\n강아지가 침대오르락 내리락이 어렵습니다\n나머지는 친절하고 조식도 괜찮았습니다',
    date: '2022-05-16',
    hash_tags: ['뷰가 좋아요', '조용히 쉬기 좋아요'],
  },
];

const hasTags = ({item}) => {
  return (
    <View>
      <Text style={styles.hashTag}>#{item} </Text>
    </View>
  );
};
const Review = ({item}) => {
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
        <View style={styles.hashTag}>
          <FlatList
            data={item.hash_tags}
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
    // flexDirection: 'row',
    backgroundColor: 'white',
    width: responsiveWidth(100),
    marginTop: responsiveHeight(2),
    justifyContent: 'center',
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
});
