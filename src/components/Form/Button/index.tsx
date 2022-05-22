import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  ButtonText
} from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  children?: React.ReactNode;
}

export function Button({
  title,
  children,
  ...rest
}: Props) {
  return (
    <Container {...rest}>
      <ButtonText>
        {title}
      </ButtonText>
      {children}
    </Container>
  );
}