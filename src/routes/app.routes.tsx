import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { RegisterLoginData } from '../screens/RegisterLoginData';
import { Welcome } from '../screens/Welcome';
import { Login } from '../screens/Login';

const {
  Navigator,
  Screen
} = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='Login'
    >
      <Screen name="Login" component={Login} />
      <Screen name="Home" component={Home} />
      <Screen name="Welcome" component={Welcome} />
      <Screen name="RegisterLoginData" component={RegisterLoginData} />
    </Navigator>
  );
}