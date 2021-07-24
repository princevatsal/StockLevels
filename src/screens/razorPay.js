import React, {useEffect, useContext, useState} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import {UserContext} from '../context/userContext';
import firestore from '@react-native-firebase/firestore';
import RazorpayCheckout from 'react-native-razorpay';

const RazorPay = ({navigation, route}) => {
  const {symbol} = route.params;
  const {refresh} = route.params;
  const {amount} = route.params;
  const {user, setUserInfo} = useContext(UserContext);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const proceedPayment = (orderId, amount) => {
    var options = {
      description: 'Buying Membership',
      currency: 'INR',
      key: 'rzp_test_6fxSJa3l7XhZGz',
      order_id: orderId,
      // theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        setUpdating(true);
        setTimeout(() => {
          firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(data => {
              var userInfo = data.data();
              console.log('userdata', userInfo);
              userInfo && setUserInfo(userInfo);
              navigation.navigate('home');
              setUpdating(false);
            })
            .catch(err => {
              alert('Please restart app for seeing changes');
              navigation.navigate('home');
              setUpdating(false);
            });
        }, 2500);
        alert('Successfull Payment');
      })
      .catch(error => {
        // handle failure
        if (error.error.description == 'Payment processing cancelled by user') {
          alert('Payment has cancelled');
        } else {
          alert('Payment Failed');
        }
        navigation.navigate('home');
      });
  };

  useEffect(() => {
    if (symbol && user) {
      axios
        .post('https://stock-level-calculator.herokuapp.com/initrazorpayment', {
          symbol,
          uid: user.uid,
          amount,
        })
        .then(data => {
          if (data.data == 'error') {
            alert('Some error occured');
            navigation.navigate('home');
          } else if (data.data.startsWith('orderid:-')) {
            proceedPayment(data.data.split('orderid:-')[1]);
          } else {
            alert('Some error occured');
            navigation.navigate('home');
          }
        })
        .catch(() => {
          alert('Some error occured');
          navigation.navigate('home');
        });
    }
  }, [refresh]);
  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <>
          <ActivityIndicator color="#00cec9" size={25} />
          <Text>
            {updating
              ? 'Updating your subscription . Please wait...'
              : 'Please wait'}
          </Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RazorPay;
