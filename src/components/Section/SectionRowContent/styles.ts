import styled from 'styled-components/native';
import Colors from '../../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  height: 54px;
`;

export const Column = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 18px;
  color: ${Colors.title};
  font-weight: 700;
`;

export const Value = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: ${Colors.subtilte};
  font-weight: 400;
`;
