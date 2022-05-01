import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  margin-bottom: ${RFValue(17)}px;
`;

export const Error = styled.Text`
  color: #fff;
  margin-bottom: 2px;
  font-family: 'Rubik_300Light';
  font-size: ${RFValue(13)}px;
  margin-left: ${RFValue(20)}px;
`;

export const ErrorColor = styled.Text`
  color: #E83F5B;
`;
export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  border-radius: 4px;
  height: ${RFValue(56)}px;
  width: 100%;
`;

export const FormInput = styled(TextInput)`
  font-size: ${RFValue(15)}px;
  color: #3D434D;
  font-family: 'Rubik_400Regular';
  font-size: 15px;
  padding: 0 20px;
  background: #ffffff;
  width: 80%;
  height: ${RFValue(40)}px; 
  border-radius: 5px;
  border: 1px #e3e4e5;
  border-right-width: 0;
  margin-bottom: ${RFValue(10)}px;
`;