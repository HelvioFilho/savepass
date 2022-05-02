import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { AppRoutes } from './app.routes';
import { userRoot } from '../hooks/auth';
import AppLoading from 'expo-app-loading';

export function Routes() {
  const { userAlreadyExist, loading } = userRoot();
  if (loading) {
    return <AppLoading />
  }
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppRoutes mainRoute={userAlreadyExist} />
    </NavigationContainer>
  );
}