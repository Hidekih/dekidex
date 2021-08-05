import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { TypeBadgeProps } from '../../utils/types';

export const Container = styled.View<TypeBadgeProps>`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 26px;
  margin: 0 8px;
  
  border-radius: 6px;
  background: ${props => Colors.type[props.typeColor] || '#000'};
`;

export const Title = styled.Text<TypeBadgeProps>`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${Colors.title};
`;
