import React, { useState } from 'react';
import { Modal, Platform, StatusBar, Linking } from 'react-native';
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
import { WarningModal } from '../../components/WarningModal';
import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';

export function Login() {
  const [visible, setVisible] = useState(false);
  const { userAlreadyExist } = userRoot();
  const { navigate } = useNavigation();

  async function handleSettings() {
    try {
      if (Platform.OS !== 'ios') {
        await startActivityAsync(ActivityAction.SETTINGS);
      } else {
        await Linking.openURL('App-Prefs:');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBiometricAuth() {

    try {
      const trigger = await LocalAuthentication.getEnrolledLevelAsync();
      if (trigger === 0) {
        setVisible(true);
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
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <WarningModal
          message={`Seu celular precisa de uma senha pin ou padrão para utilizar esse aplicativo!`}
          button={[
            {
              title: "Opções",
              color: "#FFCC00",
              textColor: "#3D434D",
              close: false,
            }
          ]}
          closeModal={() => setVisible(false)}
          primaryFunction={handleSettings}
        />

      </Modal>
    </Container>
  );
}