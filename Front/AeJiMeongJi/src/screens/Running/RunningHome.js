import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';
import RunButton from '../../components/ui/RunButton';
import RunButton2 from '../../components/ui/RunButton2';

const RunningHome = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.rootContainer}>
      <View>
        <View style={styles.runimgBox}>
          <Image
            style={styles.runImg}
            source={require('../../Assets/image/3d_dog.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentBox}>
          <View style={styles.profileBox}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.profileImg}>
                {/* <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('../../Assets/image/3d_dog.png')}
                  resizeMode="cover"
                /> */}
                <Text>이미지 들어갈 곳</Text>
              </View>
              <View>
                <View style={styles.infoBox}>
                  <View style={styles.infoName}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>앵두</Text>
                  </View>
                  <View style={styles.infoCate}>
                    <Text style={{fontSize: 10}}>10살, 5kg, 푸들</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.RunTime}>
              <Text style={{fontSize: 12}}>
                권장 산책시간은 1일 30분입니다.
              </Text>
            </View>
          </View>
          <View style={styles.runButton}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RunButton
                onPress={() => setModalVisible(true)}
                styel={styles.runLoginButton}>
                산책 시작하기
              </RunButton>
              <RunButton2
                onPress={() => {
                  navigation.navigate('RunningInfo');
                }}>
                산책 이력보기
              </RunButton2>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('산책이 시작되지 않았습니다.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{flexDirection: 'row', alignContent: 'center'}}>
                <Text style={styles.modalTitle}>앵두의 </Text>
                <Text style={styles.modalTitle}>권장 산책시간은</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.modalTitle}>'30분' </Text>
                <Text style={styles.modalTitle}>입니다.</Text>
              </View>
              <Text style={styles.modalSubtitle}>
                😊 산책을 위한 기본준비 😊
              </Text>
              <Text style={styles.modalText}>
                -목줄, 물통, 배변봉투는 챙기셨나요?
              </Text>
              <Text style={styles.modalText}>
                -보호자와 보폭을 맞춰서 걸어주세요
              </Text>
              <Text style={styles.modalText}>
                -자연을 느낄 수 있도록 배려해주세요
              </Text>
              <Text style={styles.modalText}>
                -잘못된 행동은 교육이 필요해요
              </Text>
              <Text style={styles.modalText}>
                -산책은 억지로 시키지 않아야해요
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <RunButton
                  onPress={() => {
                    navigation.navigate('RunningProfile');
                  }}>
                  <Text style={styles.textStyle}>시작</Text>
                </RunButton>
                <RunButton2
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>닫기</Text>
                </RunButton2>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default RunningHome;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.back100,
  },
  infoName: {},
  infoCate: {
    marginTop: 10,
  },
  RunTime: {
    marginTop: 22,
    marginBottom: 18,
    alignItems: 'center',
  },
  runImg: {
    flex: 1,
    marginTop: 0,
    maxWidth: '100%',
    borderRadius: 20,
  },
  profileImg: {
    backgroundColor: 'orange',
    borderRadius: 130,
    height: '98%',
    width: '30%',
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  runButton: {
    marginLeft: 27,
    marginRight: 27,
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.back200,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  runimgBox: {
    flex: 1,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileBox: {
    marginBottom: 20,
  },
  infoBox: {
    marginLeft: 23,
    marginTop: 30,
    marginBotton: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: Colors.back100,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 13,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 11,
    marginBottom: 15,
    textAlign: 'center',
  },
});
