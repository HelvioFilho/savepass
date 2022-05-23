import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Container,
  Title,
  Icon,
  ContainerTop,
  FieldContainer,
  AddButton,
  IconPlus,
  Avatar,
} from './styles';

import Logo from '../../assets/logo.svg';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import { useForm } from 'react-hook-form';
import { InputWelcome } from '../../components/Form/InputWelcome';
import { useNavigation } from '@react-navigation/native';
import { userRoot } from '../../hooks/auth';
import { Button } from '../../components/Form/Button';
import { RFValue } from 'react-native-responsive-fontsize';

interface ImageProps {
  uri: string;
  cancelled: boolean;
}

interface DataForm {
  name: string;
}

export function Welcome() {
  const [image, setImage] = useState(null);
  const { setUserUpdate } = userRoot();
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
      name: form.name.trim(),
      avatar_url,
    };
    try {
      await setUserUpdate(userData);
    } catch (err) {
      return false;
    } finally {
      navigate('Home');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Title>Qual o seu nome?</Title>
            <InputWelcome
              name="name"
              control={control}
              error={errors.name && errors.name.message}
              placeholder="Coloque o seu nome!"
              placeholderTextColor="#7D7D7D"
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
          <Button
            activeOpacity={0.8}
            onPress={handleSubmit(handleRegister)}
            title="Prosseguir"
            style={{
              width: RFValue(200),
              marginTop: RFValue(70),
            }}
          >
            <Icon
              name="md-arrow-forward-circle-outline"
              size={24}
              color="#3D434D"
              style={{ marginLeft: 5 }}
            />
          </Button>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}