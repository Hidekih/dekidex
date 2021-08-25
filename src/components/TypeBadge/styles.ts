import styled from 'styled-components/native';
import { TypeBadgeProps } from '../../utils/types';

export const Container = styled.View<TypeBadgeProps>`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 26px;
  margin: 0 8px;
  
  border-radius: 6px;
  background: ${({ theme, typeColor }) => theme.type[typeColor] || '#222'};
`;

export const Title = styled.Text<TypeBadgeProps>`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.shape};
`;
