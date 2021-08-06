import styled from 'styled-components/native';
import { SkeletonRowBoxProps } from './index';
import Colors from '../../../styles/colors';

export const Container = styled.View<SkeletonRowBoxProps>`
  flex-direction: row;
  justify-content: space-between;
  width: ${({ w }) => w };
  height: ${({ h }) => h };
`;  