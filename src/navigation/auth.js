import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PhoneLogin from '../screens/phoneLogin';
const Stack = createDrawerNavigator();
const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhoneLogin" headerMode="none">
        <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AuthStack;
