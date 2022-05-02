import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { RegisterLoginData } from '../screens/RegisterLoginData';
import { Welcome } from '../screens/Welcome';

const {
  Navigator,
  Screen
} = createStackNavigator();

interface RouteProps {
  mainRoute: boolean;
}

export function AppRoutes({ mainRoute }: RouteProps) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={mainRoute ? 'Home' : 'Welcome'}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Welcome" component={Welcome} />
      <Screen name="RegisterLoginData" component={RegisterLoginData} />
    </Navigator>
  );
}