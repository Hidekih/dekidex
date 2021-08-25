import styled from 'styled-components/native';
import { SkeletonProps } from './index';

export const Container = styled.View<SkeletonProps>`
  position: relative;
  flex: 1;
  background: ${({ bgColor, theme }) => bgColor || theme.background1};
  padding: ${({ paddingX, paddingY }) => `${paddingY}px ${paddingX}px`};
`;  