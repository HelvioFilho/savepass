import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as LocalAuthentication from "expo-local-authentication";

import Logo from '../../assets/logo.svg';

import {
  Container,
  Title,
  ContainerTop,
  FieldContainer,
  Warning,
} from './styles';

import { userRoot } from '../../hooks/auth';
import { Button } from '../../components/Form/Button';
import { RFValue } from 'react-native-responsive-fontsize';

export function Login() {
  const { userAlreadyExist } = userRoot();
  const { navigate } = useNavigation();

  async function handleBiometricAuth() {
    try {
      const trigger = await LocalAuthentication.getEnrolledLevelAsync();
      if (trigger === 0) {
        Alert.alert("Atenção", "Seu celular precisa de uma senha pin ou padrão para utilizar esse aplicativo!")
        return false;
      }

      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Entrar usando a biometria?',
        fallbackLabel: 'Entre com a senha',
      });

      if (biometricAuth.success) {
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

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ContainerTop>
        <Logo
          width="200"
          height="150"
        />
      </ContainerTop>
      <FieldContainer>
        <Title>
          Para manter as suas senhas seguras{'\n'}
          sempre vamos pedir uma senha{'\n'}
          para acessar o aplicativo.
        </Title>
        <Button
          activeOpacity={0.8}
          onPress={handleBiometricAuth}
          title="Usar senha do celular"
          style={{
            width: RFValue(250),
            marginVertical: 25,
          }}
        />
        <Warning>
          ** Atenção! Essa senha é a mesma forma de validação que você usa para desbloquear o celular
        </Warning>
      </FieldContainer>
    </Container>
  );
}