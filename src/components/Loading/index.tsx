import React from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles';

export function Loading() {
  return (
    <Container>
      <LottieView
        style={{
          width: 85,
          height: 85,
        }}
        autoPlay
        loop
        source={require('../../assets/loading.json')}
      />
    </Container>
  );
}