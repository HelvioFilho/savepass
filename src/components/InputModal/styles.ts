import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 2;
  background-color: #508bfc;
`;

export const FieldContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${RFValue(5)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(26)}px;
  font-family: 'Rubik_300Light';
  color: #ffffff;
  margin-bottom: ${RFValue(8)}px;
`;

export const Button = styled.TouchableOpacity`
  padding: ${RFValue(10)}px ${RFValue(20)}px;
  border-width: 1.5px;
  border-color: #ffffff;
  border-radius: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
  width: ${RFValue(200)}px;
  justify-content: center;
`;

export const TitleButton = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: 'Rubik_500Medium';
  color: #ffffff;
  margin-right: ${RFValue(5)}px;
`;

export const Icon = styled(Ionicons)``;

export const ButtonX = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 10px;
`;

export const IconX = styled(Ionicons)`
  
`;

export const Transparency = styled.View`
  width: 100%;
  height: auto;
  flex: 1;
  background-color: rgba(0,0,0,0.4);
`;