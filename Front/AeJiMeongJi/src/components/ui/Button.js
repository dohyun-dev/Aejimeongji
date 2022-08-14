import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';

function Button({children, onPress, style}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}>
      {/* <View> */}
      <Text style={[styles.buttonText, style]}>{children}</Text>
      {/* </View> */}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: responsiveHeight(2),
    // paddingHorizontal: 12,
    backgroundColor: Colors.btnBack100,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.btnText,
    fontSize: responsiveFontSize(2),
    fontFamily: 'IBMPlexSansKR-Regular'
  },
});
