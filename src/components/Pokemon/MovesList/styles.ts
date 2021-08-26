import styled from 'styled-components/native';

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
  background: ${({ theme, isSelected}) => isSelected ? theme.title : 'transparent'};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.text};
  border-radius: 8px;
`;

export const GameVersionTitle = styled.Text<SelectedProps>`
  font-size: 18px;
  font-weight: ${props => props.isSelected ? '700' : '400'};
  color: ${({ theme, isSelected }) => isSelected ? theme.background1 : theme.text};
`;

export const RowContent = styled.View`
  height: 54px;
  flex-direction: row;
  align-items: center;
`;

export const DataTitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.title};
  font-weight: 700;
  align-items: center;
`;

export const DataValue = styled.Text`
  flex: 1;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  font-weight: 400;
  text-align: center;
`;