import { Ionicons, Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;
export const ContainerTop = styled.View`
  width: 100%;
  height: 80%;
  justify-content: space-around;
  align-items: center;
  background-color: #508bfc;
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
  margin: ${RFValue(8)}px 0 ;
`;
export const NameInput = styled.TextInput`
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
export const Icon = styled(Ionicons)`

`;

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