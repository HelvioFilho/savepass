import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import {
  Container,
  Error,
  InputContainer,
  FormInput,
  ErrorColor,
} from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputWelcome({
  name,
  control,
  error,
  ...rest
}: Props) {

  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            <FormInput
              onChangeText={onChange}
              value={value}
              {...rest}
            />
          </InputContainer>
        )}
      />
      {error && <Error>* {error}</Error>}
    </Container>
  )
}