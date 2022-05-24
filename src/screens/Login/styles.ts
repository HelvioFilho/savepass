import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #508bfc;
`;

export const ContainerTop = styled.View`
  width: 100%;
  height: 35%;
  justify-content: space-around;
  align-items: center;
  background-color: #F2F3F5;
  padding-top: ${RFPercentage(3)}px;
  margin-bottom: 25px;
`;

export const FieldContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(26)}px;
  font-family: 'Rubik_300Light';
  color: #F2F3F5;
  margin-bottom: 5px;
`;

export const Warning = styled.Text`
  font-size: ${RFValue(12)}px;
  color: #d1d1d1;
  line-height: ${RFValue(17)}px;
  font-family: 'Rubik_300Light';
  padding: 20px;
`;