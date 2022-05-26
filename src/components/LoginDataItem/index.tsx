import React, { useState } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import {
  Container,
  ShowPasswordButton,
  Icon,
  PassData,
  Title,
  Password,
  LoginData,
  BoldTitle,
  UserSave,
} from './styles';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface Props {
  service_name: string;
  userSave: string;
  password: string;
  id: string;
  deleteLoginData: (id: string) => void;
}

export function LoginDataItem({
  service_name,
  userSave,
  password,
  id,
  deleteLoginData
}: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  function RightActions() {
    return (
      <TouchableOpacity
        style={{
          position: 'relative',
          top: 8.5,
          left: 10,
          width: RFPercentage(10),
          height: RFValue(65),
          borderTopRightRadius: 7,
          borderBottomRightRadius: 7,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
        onPress={() => deleteLoginData(id)}
      >
        <Feather
          name="trash"
          color="white"
          size={28}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Swipeable renderRightActions={RightActions}>
      <Container
        colors={[
          passIsVisible
            ? '#EBF2FF'
            : '#ffffff',
          '#ffffff'
        ]}
      >
        <ShowPasswordButton
          onPress={handleTogglePassIsVisible}
        >
          <Icon
            name={passIsVisible ? "eye" : "eye-off"}
            color={passIsVisible ? '#1967FB' : '#888D97'}
          />
        </ShowPasswordButton>

        {passIsVisible
          ? (
            <PassData>
              <Title>{service_name}</Title>
              <Password>{password}</Password>
            </PassData>
          )
          : (
            <LoginData>
              <BoldTitle>{service_name}</BoldTitle>
              <UserSave>{userSave}</UserSave>
            </LoginData>
          )
        }
      </Container>
    </Swipeable>
  );
}