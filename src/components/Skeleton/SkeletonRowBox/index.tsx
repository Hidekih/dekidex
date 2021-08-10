import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { Container } from './styles';

export interface SkeletonRowBoxProps extends ViewProps {
  children: ReactNode;
  w: string;
  h: string;
}

export function SkeletonRowBox({ 
  children,
  h,
  w,
  ...rest
}: SkeletonRowBoxProps) {
  return (
    <Container
      {...rest}
      w={w}
      h={h}
    >
      {children}
    </Container>
  )
}