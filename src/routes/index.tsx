import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { AppRoutes } from './app.routes';
import { userRoot } from '../hooks/auth';
import { Loading } from '../components/Loading';

export function Routes() {
  const { loading } = userRoot();
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppRoutes />
    </NavigationContainer>
  );
}