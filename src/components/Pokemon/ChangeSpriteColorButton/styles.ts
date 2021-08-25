import styled from 'styled-components/native';

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
  color: ${({ theme, isSelected}) => isSelected ? '#f9f9f9' : theme.inactivity };
  font-weight: 700;
`;