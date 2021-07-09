import React from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const GradientButton = ({colors, text}) => {
  return (
    <LinearGradient colors={colors} style={styles.button}>
      <Text style={styles.btnTxt}>{text}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 6,
    elevation: 4,
    justifyContent: 'center',
  },
  btnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Nunito-Regular',
  },
});

export default GradientButton;
