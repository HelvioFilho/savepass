import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Container,
  Title,
  Button,
  TitleButton,
  Icon,
  ContainerTop,
  FieldContainer,
  AddButton,
  IconPlus,
  Avatar,
} from './styles';

import Logo from '../../assets/logo.svg';
import { Alert, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { InputWelcome } from '../../components/Form/InputWelcome';
import { useNavigation } from '@react-navigation/native';
import { userRoot } from '../../hooks/auth';

interface ImageProps {
  uri: string;
  cancelled: boolean;
}

interface DataForm {
  name: string;
}

export function Welcome() {
  const [image, setImage] = useState(null);
  const { setUserUpdate, awaitUser } = userRoot();
  const { navigate } = useNavigation();

  const schema = Yup.object().shape({
    name: Yup
      .string()
      .required('O nome não pode ser vazio!'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function CheckOSPermission() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Atenção', 'Permissão negada');
      } else {
        PickImage();
      }
    }
  }

  async function PickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }) as ImageProps;

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  async function handleRegister(form: Partial<DataForm>) {
    const avatar_url = image ? image : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${form.name}&length=1`;
    const userData = {
      name: form.name,
      avatar_url,
    };
    await setUserUpdate(userData);
  }

  useEffect(() => {
    if (!awaitUser) {
      navigate('Home');
    }
  }, [awaitUser]);

  return (
    <Container>
      <ContainerTop>
        <Logo
          width="200"
          height="150"
        />
        <FieldContainer>
          <Title>Qual o seu nome?</Title>
          <InputWelcome
            name="name"
            control={control}
            error={errors.name && errors.name.message}
            placeholder="Coloque o seu nome!"
          />
          <Title>Deseja adicionar uma foto? (opcional)</Title>
          <AddButton
            onPress={CheckOSPermission}
            activeOpacity={0.8}
          >
            {image ?
              <Avatar source={{ uri: image }} />
              :
              <IconPlus
                name="plus"
                color="#FFFFFF"
                size={24}
              />
            }
          </AddButton>
        </FieldContainer>
      </ContainerTop>
      <Button
        activeOpacity={0.8}
        onPress={handleSubmit(handleRegister)}
      >
        <TitleButton>
          Prosseguir
        </TitleButton>
        <Icon
          name="md-arrow-forward-circle-outline"
          size={24}
          color="#ffffff"
        />
      </Button>
    </Container>
  );
}