import styled from 'styled-components/native';
import { SkeletonProps } from './index';
import Colors from '../../styles/colors';

export const Container = styled.View<SkeletonProps>`
  position: relative;
  flex: 1;
  background: ${({ bgColor }) => bgColor || Colors.background[2]};
  padding: ${({ paddingX, paddingY }) => `${paddingY}px ${paddingX}px`};
`;  