import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Logo from '../../assets/logo.png';

import Bull from '../../assets/bull.png';
const Brand = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bullCover}>
        <Image source={Bull} style={styles.bull} />
      </View>
      <Text style={styles.text}>Stock Market Analyser</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    height: 52,
    width: 47,
    marginRight: 10,
  },
  text: {
    color: '#FA5931',
    fontSize: 15,
    fontFamily: 'Nunito-ExtraBold',
    letterSpacing: 0.8,
    marginBottom: 7,
  },
  bull: {
    height: 80,
    width: 80,
  },
  bullCover: {
    height: 120,
    width: 120,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6fcfa',
  },
  text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 25,
    width: '50%',
  },
});

export default Brand;
