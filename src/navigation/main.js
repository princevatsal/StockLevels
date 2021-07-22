import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../context/userContext';
import HomePage from '../screens/homePage';
import Subscription from '../screens/subscription';
import Strikes from '../screens/strikes';
import RazorPay from '../screens/razorPay';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Watchlist from '../screens/watchlist';
const Stack = createDrawerNavigator();

const DrawerContent = () => {
  return (
    <View style={{margin: 10}}>
      <Text style={{fontFamily: 'Nunito-SemiBold', fontSize: 15}}>
        Stock Market Analyser
      </Text>
    </View>
  );
};
const MainStack = () => {
  const {user, setUser, setWatchlist} = useContext(UserContext);
  useEffect(() => {
    AsyncStorage.getItem('watchlist').then(watchlist => {
      if (watchlist) {
        const parsedWatchlist = JSON.parse(watchlist);
        setWatchlist(parsedWatchlist);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        headerMode="none"
        drawerContent={props => <DrawerContent {...props} />}>
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="subs" component={Subscription} />
        <Stack.Screen name="strikes" component={Strikes} />
        <Stack.Screen name="razorpay" component={RazorPay} />
        <Stack.Screen name="watchlist" component={Watchlist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
