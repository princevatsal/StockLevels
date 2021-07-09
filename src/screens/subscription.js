import React, {useState} from 'react';
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
import Back from '../assets/back.png';
import Right from '../assets/right.png';
export default function SubsCription({navigation}) {
  const [selected, setSelected] = useState(null);

  const Point = ({text}) => {
    return (
      <View style={styles.point}>
        <Image source={Okay} style={styles.okay} />
        <Text style={styles.pointTxt}>{text}</Text>
      </View>
    );
  };
  const Card = ({txt1, txt2, price, active, onClick}) => {
    return (
      <TouchableOpacity
        style={active ? styles.priceCardActive : styles.priceCard}
        onPress={onClick}>
        <View style={styles.left}>
          <View style={active ? styles.overlayActive : styles.overlay}>
            <Image source={Bag} style={styles.overlayIcon} />
          </View>
          <View style={styles.left2}>
            <Text style={active ? styles.quoteActive : styles.quote}>
              {txt1}{' '}
            </Text>
            <Text style={active ? styles.quoteActive : styles.quote}>
              {txt2}
            </Text>
          </View>
        </View>
        <Text style={active ? styles.priceActive : styles.price}>
          {'\u20B9'} {price}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={Background} style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backCover}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <View style={styles.bullCover}>
          <Image source={Bull} style={styles.bull} />
        </View>
        <View style={styles.main}>
          <Text style={styles.head}>Guarenteed Working </Text>
          <Text style={styles.head2}>Levels BankNifty</Text>
          <View style={styles.para}>
            <Point
              text={`${
                selected == 'monthly' ? 'Monthly' : 'Daily'
              } levels before market opens`}
            />
            <Point text={`Complete strategy`} />
            <Point
              text={`${
                selected == 'monthly' ? 'Monthly' : 'Daily'
              } Buy and Sell levels`}
            />
            <Point text={`Get all stock future and options levels`} />
          </View>
        </View>
        <Text style={styles.head3}>Select a package to get started</Text>
        <Card
          txt1="Daily"
          txt2="Levels"
          price="200"
          active={selected == 'daily'}
          onClick={() => {
            setSelected('daily');
          }}
        />
        <Card
          txt1="Monthly"
          txt2="Levels"
          price="5K"
          active={selected == 'monthly'}
          onClick={() => {
            setSelected('monthly');
          }}
        />
        {selected != null && (
          <View style={styles.btnCover}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnTxt}>Buy Now</Text>
              <Image source={Right} style={styles.right} />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </ScrollView>
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
    elevation: 4,
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
    backgroundColor: '#DFE6E9',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 2,
  },
  priceCardActive: {
    elevation: 2,
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
    color: '#000',
    fontFamily: 'Lato-Bold',
    fontSize: 17,
  },
  overlayIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  overlay: {
    backgroundColor: '#fff',
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
    color: '#000',
  },
  priceActive: {
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: 17,
  },
  overlayActive: {
    backgroundColor: '#41ca96',
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  quoteActive: {
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
  backCover: {},
  back: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginLeft: 5,
  },
});
