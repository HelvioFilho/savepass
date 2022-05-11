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
  Icon
} from './styles';

interface DataForm {
  name: string;
}

interface ModalProps {
  changeName: (form: Partial<DataForm>) => void;
}

export function InputModal({ changeName }: ModalProps) {

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
    <Container>
      <FieldContainer>
        <Title>Qual o seu nome?</Title>
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
  );
}