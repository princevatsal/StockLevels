import React, {useEffect, useContext, useState} from 'react';
import AuthStack from './auth';
import MainStack from './main';
import IntroStack from './intro';
import {UserContext} from '../context/userContext';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

const Navigation = () => {
  const {user, setUser, visited, setVisited} = useContext(UserContext);
  // Handle user state changes
  function onAuthStateChanged(User) {
    if (User) {
      setUser(User);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('visited').then(data => {
      if (data && data == 'yes') {
        setVisited(true);
      } else {
        setVisited(false);
      }
    });
  }, []);

  return (
    <>
      {visited == false ? <IntroStack /> : user ? <MainStack /> : <AuthStack />}
    </>
  );
};
export default Navigation;
