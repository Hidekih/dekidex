import styled from 'styled-components/native';
import Colors from '../../../styles/colors';

export const Container = styled.View`
  height: 54px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 20px;
  color: ${Colors.title};
  font-weight: 700;
  text-align: center;
`;
