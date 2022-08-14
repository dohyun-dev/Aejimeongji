import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants/styles';

function RunButton({children, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default RunButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(7),
    backgroundColor: Colors.btnBack100,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: responsiveWidth(20),
    marginBottom: responsiveHeight(1.5),
    marginTop: responsiveHeight(1.5),
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.btnText,
    fontSize: responsiveFontSize(2.4),
    fontFamily: '강원교육튼튼',
  },
});
