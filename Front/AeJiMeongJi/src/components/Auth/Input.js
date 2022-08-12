import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../constants/styles';



const Input = ({textInputConfig, style}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput style={[styles.input, style]} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems:'center'
  },
  input: {
    width: responsiveWidth(70),
    paddingHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    borderWidth: responsiveHeight(0.3),
    borderRadius: responsiveWidth(5),
    borderColor: Colors.inputBorder,
    color: Colors.inputBorder
  },
});
