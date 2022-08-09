import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';

function GuideButton({children, onPress}) {
  const fetchGuide = () => {
    console.log('fetchGuide');
    onPress(children);
  };

  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={fetchGuide}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default GuideButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 50,
    backgroundColor: '#E6E6E6',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: '#6E6E6E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
