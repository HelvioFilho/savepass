import React from 'react';
import { useNavigation } from '@react-navigation/native';


import {
  Container,
  AboutUser,
  EditAvatar,
  Avatar,
  TextContainer,
  HelloMessage,
  BoldText,
  PrimaryMessage,
  EditButton,
  SecondaryMessage,
  AddButton,
  Icon,
  BackButton,
  Title,
} from './styles';

interface HeaderProps {
  user?: {
    name: string;
    avatar_url: string;
  },
  changeImage?: () => void;
}

export function Header({ user, changeImage }: HeaderProps) {
  const { navigate, goBack } = useNavigation();

  function handleAddPass() {
    navigate('RegisterLoginData');
  }

  return (
    <Container
      hasUserData={!!user}
      style={{
        ...(user
          ? {
            backgroundColor: '#1967FB'
          }
          : {
            backgroundColor: '#FFFFFF'
          })
      }}
    >
      {user ? (
        <>
          <AboutUser>
            <EditAvatar
              activeOpacity={0.8}
              onPress={changeImage}
            >
              <Avatar source={{ uri: user.avatar_url }} />
            </EditAvatar>

            <TextContainer>
              <PrimaryMessage>
                <HelloMessage>
                  Olá,
                </HelloMessage>
                <EditButton
                  activeOpacity={0.8}
                  onPress={() => { }}
                >
                  <BoldText> {user.name} </BoldText>
                  <Icon
                    name="edit"
                    color="#FFFFFF"
                    size={18}
                  />
                </EditButton>
              </PrimaryMessage>
              <SecondaryMessage>
                Sinta-se seguro aqui
              </SecondaryMessage>
            </TextContainer>
          </AboutUser>

          <AddButton onPress={handleAddPass}>
            <Icon
              name="plus"
              color="#FFFFFF"
              size={24}
            />
          </AddButton>
        </>
      ) : (
        <>
          <BackButton onPress={goBack}>
            <Icon
              name="chevron-left"
              color="#1967FB"
              size={28}
            />
          </BackButton>

          <Title>Cadastro de senha</Title>
        </>
      )}
    </Container>
  );
}