import { Ionicons, Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerTop = styled.View`
  width: 100%;
  height: 75%;
  justify-content: space-around;
  align-items: center;
  background-color: #508bfc;
  padding-top: ${RFPercentage(20)}px;
`;

export const FieldContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${RFPercentage(5)}px;
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
  background-color: #508bfc;
  border-radius: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
  width: ${RFValue(200)}px;
  justify-content: center;
  margin-top: ${RFValue(50)}px;
`;

export const TitleButton = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: 'Rubik_500Medium';
  color: #ffffff;
  margin-right: ${RFValue(5)}px;
`;

export const Icon = styled(Ionicons)``;

export const AddButton = styled.TouchableOpacity`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border: 1.5px #e3e4e5;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
`;

export const IconPlus = styled(Feather)``;