import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface buttonProps {
  color: string;
}

interface FooterProps {
  itens: number;
}

interface TitleProps {
  textColor: string;
}

export const Container = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;

  background-color: rgba(0,0,0,0.4);
`;

export const IconX = styled(Ionicons)``;

export const ContainerModal = styled.View`
  width: 90%;
  height: 160px;
  justify-content: center;
  align-items: center;
  
  background-color: #508bfc;
  
  border-radius: 20px;
  padding: 10px;
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
`;

export const Message = styled.Text`
  width: 90%;
  font-size: ${RFValue(14)}px;
  
  color: #EBF2FF;
  
  padding-top: 20px;
`;

export const Footer = styled.View<FooterProps>`
  width: 90%;
  height: 50px;

  padding: 16px 35px 0;
  
  flex-direction: row;
  justify-content: ${({ itens }) => itens === 1 ? "center" : "space-between"} ;
`;

export const Button = styled.TouchableOpacity<buttonProps>`
  width: 90px;
  height: 40px;

  justify-content: center;
  align-items: center;
  
  background-color: ${({ color }) => color};
  
  border-radius: 10px;
`;

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(13)}px;
  
  color: ${({ textColor }) => textColor};
`;