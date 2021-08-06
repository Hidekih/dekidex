import styled from 'styled-components/native';
import Colors from '../../styles/colors';

type ToggleButtonTitleProps = {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ToggleButtonTitle = styled.Text<ToggleButtonTitleProps>`
  font-size: 18px;
  color: ${props => props.isSelected ? Colors.title : Colors.background[1] };
  font-weight: 700;
`;