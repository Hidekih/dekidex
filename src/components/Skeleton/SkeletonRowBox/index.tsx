import React, { ReactNode } from 'react';
import { Container } from './styles';

export type SkeletonRowBoxProps = {
  children: ReactNode;
  w: string;
  h: string;
}

export function SkeletonRowBox({ 
  children,
  h,
  w,
}: SkeletonRowBoxProps) {
  return (
    <Container
      w={w}
      h={h}
    >
      {children}
    </Container>
  )
}