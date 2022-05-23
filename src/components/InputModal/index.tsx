import React from 'react';
import { InputWelcome } from '../Form/InputWelcome';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Container,
  FieldContainer,
  Title,
  Button,
  TitleButton,
  Icon,
  Transparency,
  ButtonX,
  IconX,
} from './styles';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

interface DataForm {
  name: string;
}

interface ModalProps {
  changeName: (form: Partial<DataForm>) => void;
  closeModal: () => void;
}

export function InputModal({ changeName, closeModal }: ModalProps) {

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

  return (
    <>
      <TouchableWithoutFeedback onPress={closeModal}>
        <Transparency />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 2 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <ButtonX
              activeOpacity={0.8}
              onPress={closeModal}
            >
              <IconX
                name="md-close-circle-outline"
                size={40}
                color="#ffffff"
              />
            </ButtonX>
            <FieldContainer>
              <Title>Entre com o novo nome:</Title>
              <InputWelcome
                name="name"
                control={control}
                error={errors.name && errors.name.message}
                placeholder="Coloque o seu nome!"
              />
            </FieldContainer>
            <Button
              activeOpacity={0.8}
              onPress={handleSubmit(changeName)}
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}