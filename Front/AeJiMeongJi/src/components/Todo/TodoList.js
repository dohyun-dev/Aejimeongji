import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
const url = 'http://i7d203.p.ssafy.io:8080';

const TodoList = props => {
  const navigation = useNavigation();

  const dogId = useSelector(state => state.profile.id);
  const [todolist, setTodolist] = useState([]);

  const {modalVisible, setModalVisible} = props;
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }

    //데이터 받기

    console.log('날짜는?');
    console.log(props.selectedDate);
    axios
      .get(url + `/api/dog/${dogId}/calendar?date=${props.selectedDate}`)
      .then(response => {
        console.log('reponse찍기');
        console.log(response);
        if (response.status == 200) {
          console.log('오늘의 to-do');
          console.log(response.data);
          setTodolist(response.data);
        } else {
          console.log(error.response + '가이드받기에러');
        }
      });
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <Text style={{fontSize: 30}}>{props.selectedDate}</Text>
          <View>
            {todolist.length != 0 ? (
              <View>
                <Text>{todolist[0].content}</Text>
                <Text>{todolist[1].content}</Text>
              </View>
            ) : (
              <Text>없어</Text>
            )}
          </View>
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TodoUpload', {date: props.selectedDate});
          }}
          style={{paddingLeft: 24}}>
          <Image
            style={styles.plusButton}
            resizeMode="contain"
            source={require('../../Assets/image/plusButton.png')}
            title="plusButton"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  plusButton: {
    borderWidth: 1,
    position: 'absolute',
    bottom: 60,
    right: 20,
    alignSelf: 'flex-end',
    marginTop: 5,

    maxWidth: '10%',
    maxHeight: '10%',
  },
});

export default TodoList;
