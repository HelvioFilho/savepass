import 'react-native-gesture-handler';
import React from 'react';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium
} from '@expo-google-fonts/rubik';
import { Routes } from './src/routes';
import { UserProvider } from './src/hooks/auth';


export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}