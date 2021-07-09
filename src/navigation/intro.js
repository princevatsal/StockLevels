import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LandingPage from '../screens/landingPage';
import GoThrough from '../screens/goThrough';

const Stack = createDrawerNavigator();
const IntroStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode="none">
        <Stack.Screen name="home" component={LandingPage} />
        <Stack.Screen name="goThrough" component={GoThrough} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default IntroStack;
