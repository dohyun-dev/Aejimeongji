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
    paddingVertical: 11,
    paddingHorizontal: 28,
    backgroundColor: Colors.btnBack100,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginLeft: 70,
    marginRight: 70,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.btnText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
