import React from 'react';
import LottieView from 'lottie-react-native';
import {View, Text} from 'react-native';

const NothingTodo = () => {
  return (
    <View>
      <Text>들어왔다</Text>
      <LottieView
        source={require('../../Assets/animation/dog.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default NothingTodo;
