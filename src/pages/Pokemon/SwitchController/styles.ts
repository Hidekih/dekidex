import styled from 'styled-components/native';
import Colors from '../../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  border-top-color: ${Colors.background[1]};
  border-top-width: 2px;
  padding: 0 8px;
  background: ${Colors.background[3]};
`;

export const IconButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.title};
`;