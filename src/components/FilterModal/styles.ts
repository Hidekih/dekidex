import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { GenProps } from './index';

type GenItemProps = {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

export const Content = styled.View`
  width: 93%;
  align-items: center;
  padding: 24px 16px;

  background: ${({ theme }) => theme.background2};
  border-radius: 12px;
`;

export const BorderSpaceButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
`;

export const RowContent = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  background: ${({ theme }) => theme.text};
  margin-left: 16px;
  border-radius: 12px;
`;

export const RowDividerWithText = styled.View`
  flex-direction: row;
  align-items: center;
  height: 24px;
  margin: 16px 0;
`;

export const Line = styled.View`
  height: 2px;
  background: black;
  flex: 1;
  background: ${({ theme }) => theme.text};
`;

export const RowDividerTitle = styled.Text`
  font-size: 18px;
  margin: 0 16px;
  color: ${({ theme }) => theme.text};
`;

export const Label = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.title};
`;

export const InputNumber = styled.TextInput`
  width: 80px;
  height: 40px;
  padding: 0 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  background: ${({ theme }) => theme.background1};
  text-align: center;
`;

export const GenerationList = styled(FlatList as new () => FlatList<GenProps>)`
  margin-top: 16px;
`;

export const GenItem = styled.TouchableOpacity<GenItemProps>`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 40px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.text};
  margin-right: 12px;
  border-radius: 8px;
  background: ${({ isSelected, theme }) => isSelected ? theme.text : 'transparent'};
`;

export const GenTitle = styled.Text<GenItemProps>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ isSelected, theme }) => isSelected ? theme.background2 : theme.title };
`;
