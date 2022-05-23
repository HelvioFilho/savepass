import { Ionicons, Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(26)}px;
  font-family: 'Rubik_300Light';
  color: #ffffff;
  margin-bottom: 5px;
`;

export const Icon = styled(Ionicons)``;

export const AddButton = styled.TouchableOpacity`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border: 1.5px #e3e4e5;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

export const Avatar = styled.Image`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
`;

export const IconPlus = styled(Feather)``;