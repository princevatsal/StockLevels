import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Background from '../assets/background2.png';
import Bull from '../assets/bull.png';
import Okay from '../assets/okay.png';
import Bag from '../assets/bag.png';
import User from '../assets/user.png';
import Right from '../assets/right.png';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../context/userContext';
export default function GoThrough({navigation}) {
  const {setVisited} = useContext(UserContext);

  const Point = ({text}) => {
    return (
      <View style={styles.point}>
        <Image source={Okay} style={styles.okay} />
        <Text style={styles.pointTxt}>{text}</Text>
      </View>
    );
  };
  return (
    <ImageBackground source={Background} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bullCover}>
          <Image source={Bull} style={styles.bull} />
        </View>
        <View style={styles.main}>
          <Text style={styles.head}>Get Started And </Text>
          <Text style={styles.head2}>Book Profit</Text>
          <View style={styles.para}>
            <Point text={'Make consistant profits regularly'} />
            <Point text={'99% working effeciency '} />
            <Point text={'Daily market levels before market opening'} />
            <Point text={'Get analysis of any stock , future or option '} />
          </View>
        </View>
        <Text style={styles.head3}>Be 100% profitable only at</Text>
        <View style={styles.priceCard}>
          <View style={styles.left}>
            <View style={styles.overlay}>
              <Image source={Bag} style={styles.overlayIcon} />
            </View>
            <View style={styles.left2}>
              <Text style={styles.quote}>Get Entry And </Text>
              <Text style={styles.quote}>Exit Daily</Text>
            </View>
          </View>
          <Text style={styles.price}>{'\u20B9'} 200</Text>
        </View>
        <View style={styles.priceCard}>
          <View style={styles.left}>
            <View style={styles.overlay}>
              <Image source={Bag} style={styles.overlayIcon} />
            </View>
            <View style={styles.left2}>
              <Text style={styles.quote}>Get Entry And </Text>
              <Text style={styles.quote}>Exit Monthly</Text>
            </View>
          </View>
          <Text style={styles.price}>{'\u20B9'} 5K</Text>
        </View>
        <View style={styles.btnCover}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AsyncStorage.setItem('visited', 'yes')
                .then(() => {})
                .catch(() => {});
              setVisited(true);
            }}>
            <Image source={User} style={styles.user} />
            <Text style={styles.btnTxt}>Login</Text>
            <Image source={Right} style={styles.right} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  bull: {
    height: 100,
    width: 100,
  },
  bullCover: {
    height: 140,
    width: 140,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6fcfa',
  },
  main: {
    marginTop: 30,
  },
  head: {
    fontSize: 30,
    fontFamily: 'Nunito-Bold',
  },
  head2: {
    fontSize: 30,
    color: '#5c5c5c',
    fontFamily: 'Nunito-Bold',
  },
  head3: {
    fontSize: 23,
    color: '#5c5c5c',
    fontFamily: 'Nunito-Bold',
    marginTop: 35,
  },
  para: {
    marginTop: 25,
  },
  point: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  okay: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // elevation: 4,
    marginRight: 15,
  },
  pointTxt: {
    fontFamily: 'Lato-SemiBold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  priceCard: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#0ebe7e',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  price: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 17,
  },
  overlayIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  overlay: {
    backgroundColor: '#41ca96',
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quote: {
    fontFamily: 'Lato-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  btnCover: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    width: 170,
    paddingVertical: 18,
    backgroundColor: '#16a086',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 20,
    elevation: 4,
    flexDirection: 'row',
  },
  btnTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#fff',
  },
  user: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
  right: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    marginLeft: 15,
  },
});
