import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Colors from '../../styles/colors';
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
  width: 100%;
  align-items: center;
  padding: 24px 16px;

  background: ${Colors.background[3]};
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
  height: 44px;
  background: ${Colors.subtilte};
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
  background: ${Colors.subtilte};
`;

export const RowDividerTitle = styled.Text`
  font-size: 18px;
  margin: 0 16px;
  color: ${Colors.subtilte};
`;

export const Label = styled.Text`
  font-size: 20px;
  color: ${Colors.title};
`;

export const InputNumber = styled.TextInput`
  width: 110px;
  height: 44px;
  padding: 0 16px;
  font-size: 16px;
  color: ${Colors.subtilte};
  border-radius: 12px;
  background: ${Colors.background[1]};
  text-align: center;
`;

export const GenerationList = styled(FlatList as new () => FlatList<GenProps>)`
  margin-top: 16px;
`;

export const GenItem = styled.TouchableOpacity<GenItemProps>`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 44px;
  border-width: 2px;
  border-color: ${Colors.subtilte};
  margin-right: 16px;
  border-radius: 8px;
  background: ${({ isSelected }) => isSelected ? Colors.subtilte : 'transparent'};
`;

export const GenTitle = styled.Text<GenItemProps>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ isSelected }) => isSelected ? Colors.background[3] : Colors.title };
`;
