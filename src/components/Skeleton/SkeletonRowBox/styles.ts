import { View } from 'react-native';
import styled from 'styled-components/native';
import { SkeletonRowBoxProps } from './index';

export const Container = styled(View)<SkeletonRowBoxProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${({ w }) => w };
  height: ${({ h }) => h };
`;  