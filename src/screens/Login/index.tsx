import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as LocalAuthentication from "expo-local-authentication";

import { userRoot } from '../../hooks/auth';

export function Login() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const { userAlreadyExist } = userRoot();

  const { navigate } = useNavigation();

  async function handleBiometricAuth() {
    try {
      const trigger = await LocalAuthentication.getEnrolledLevelAsync();
      console.log(trigger);
      if (trigger === 0) {
        Alert.alert("Atenção", "Seu celular precisa de uma senha pin ou padrão para utilizar esse aplicativo!")
        return false;
      }

      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Entrar usando a biometria?',
        fallbackLabel: 'Entre com a senha',
      });
      if (biometricAuth) {
        if (userAlreadyExist) {
          navigate('Home');
        } else {
          navigate('Welcome');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function compatible() {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    }
    compatible();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => handleBiometricAuth()}>
        <Text>Botão</Text>
      </TouchableOpacity>
    </View>
  );
}