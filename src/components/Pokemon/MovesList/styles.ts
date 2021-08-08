import styled from 'styled-components/native';
import Colors from '../../../styles/colors';

type SelectedProps = {
  isSelected: boolean;
}

export const Container = styled.View``;

export const GameVersionsList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 6px 0 16px 0;
`;

export const GameVersionButton = styled.TouchableOpacity<SelectedProps>`
  align-items: center;
  justify-content: center;
  height: 34px;
  margin-top: 12px;
  margin-right: 8px;
  padding: 0 8px; 
  background: ${props => props.isSelected ? Colors.title : 'transparent'};
  border-width: 1px;
  border-style: solid;
  border-color: ${Colors.subtilte};
  border-radius: 8px;
`;

export const GameVersionTitle = styled.Text<SelectedProps>`
  font-size: 18px;
  font-weight: ${props => props.isSelected ? '700' : '400'};
  color: ${props => props.isSelected ? Colors.background[2] : Colors.subtilte};
`;

export const RowContent = styled.View`
  height: 54px;
  flex-direction: row;
  align-items: center;
`;

export const DataTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.title};
  font-weight: 700;
  align-items: center;
`;

export const DataValue = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${Colors.subtilte};
  font-weight: 400;
  text-align: center;
`;