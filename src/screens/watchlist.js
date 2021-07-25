import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {UserContext} from '../context/userContext';
import Minus from '../assets/minus.png';
import axios from 'axios';
export default function Watchlist({navigation}) {
  const {watchlist, userInfo, updateWatchlist} = useContext(UserContext);

  const Watch = ({symbol, strike, type, expiry}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [expired, setExpired] = useState(false);
    useEffect(() => {
      if (
        userInfo.subscription.find(item => item.symbol == symbol).subsExpiry <
        Date.now()
      ) {
        setExpired(true);
      } else {
        setExpired(false);
      }
      fetch(
        'https://stock-level-calculator.herokuapp.com/getlevel?strike=' +
          strike +
          '&symbol=' +
          symbol +
          '&expiry=' +
          expiry +
          '&type=' +
          type,
      )
        .then(data => {
          return data.json();
        })
        .then(data => {
          setLoading(false);
          setData(data);
        })
        .catch(err => {
          console.log(err);
        });
    }, [symbol, strike, type, expiry]);
    return (
      <View style={styles.optionW}>
        <TouchableOpacity
          style={styles.minusCover}
          onPress={() => {
            updateWatchlist(
              watchlist.filter(
                item =>
                  !(
                    item.symbol == symbol &&
                    item.expiry == expiry &&
                    item.strike == strike &&
                    item.type == type
                  ),
              ),
            );
          }}>
          <Image source={Minus} style={styles.minus} />
        </TouchableOpacity>
        {expired ? (
          <View style={styles.expired}>
            <Text style={styles.expiredTxt}>
              Subscription for {symbol} is expired
            </Text>
            <TouchableOpacity
              style={styles.expiredBtn}
              onPress={() => {
                navigation.navigate('subs', {symbol});
              }}>
              <Text style={styles.expiredBtnTxt}>Renew</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View
              style={{
                ...styles.row,
                paddingVertical: 5,
              }}>
              <Text style={styles.headingW}>
                {'' + symbol + ' ' + strike + ' ' + type + ' ' + expiry}
              </Text>
              <View style={styles.rightTargets}>
                <Text style={styles.target}>T1</Text>
                <Text style={styles.target}>T2</Text>
                <Text style={styles.target}>T3</Text>
                <Text
                  style={{
                    ...styles.target,
                    borderRightWidth: 0,
                    color: '#D35400',
                  }}>
                  SL
                </Text>
              </View>
            </View>
            {!loading && data ? (
              <>
                <View style={styles.row}>
                  <Text style={{...styles.headingW, color: 'green'}}>
                    {'Buy above'} {data.buyAbove.toFixed(2)}
                  </Text>
                  <View style={styles.rightTargets}>
                    <Text style={{...styles.target, color: 'green'}}>
                      {data.T1.toFixed(2)}
                    </Text>
                    <Text style={{...styles.target, color: 'green'}}>
                      {data.T2.toFixed(2)}
                    </Text>
                    <Text style={{...styles.target, color: 'green'}}>
                      {data.T3.toFixed(2)}
                    </Text>
                    <Text
                      style={{
                        ...styles.target,
                        color: '#D35400',
                        borderRightWidth: 0,
                      }}>
                      {data.buySL.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={{...styles.headingW, color: 'red'}}>
                    {'Sell Below'} {data.sellBelow.toFixed(2)}
                  </Text>
                  <View style={styles.rightTargets}>
                    <Text style={{...styles.target, color: 'red'}}>
                      {data.R1.toFixed(2)}
                    </Text>
                    <Text style={{...styles.target, color: 'red'}}>
                      {data.R2.toFixed(2)}
                    </Text>
                    <Text style={{...styles.target, color: 'red'}}>
                      {data.R3.toFixed(2)}
                    </Text>
                    <Text
                      style={{
                        ...styles.target,
                        color: '#D35400',
                        borderRightWidth: 0,
                      }}>
                      {data.sellSL.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={{...styles.row, marginVertical: 30}}>
                <ActivityIndicator color="green" size={23} />
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Your Watchlist</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {watchlist.map(item => {
          return (
            <Watch
              symbol={item.symbol}
              type={item.type}
              expiry={item.expiry}
              strike={item.strike}
              key={'' + item.symbol + item.strike + item.type + item.expiry}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,

    backgroundColor: '#f6fcfa',
  },
  brand: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 25,
  },

  optionW: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
    paddingTop: 20,
    marginHorizontal: 1,
  },
  minus: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  minusCover: {
    position: 'absolute',
    right: 20,
    top: 5,
  },

  headingW: {fontFamily: 'Lato-Bold', width: '50%'},
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  rightTargets: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
  },
  target: {
    width: '29%',
    borderRightWidth: 1,
    borderRightColor: '#a1a1a1',
    textAlign: 'center',
    fontFamily: 'Lato-SemiBold',
  },
  expired: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  expiredTxt: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: 'red',
    marginHorizontal: 5,
  },
  expiredBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#16a086',
    borderRadius: 20,
    marginTop: 15,
  },
  expiredBtnTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: '#fff',
  },
});
