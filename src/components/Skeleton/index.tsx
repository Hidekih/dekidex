import React, { ReactNode } from 'react';

import { Container } from './styles';

export type SkeletonProps = {
  children: ReactNode;
  paddingY?: number;
  paddingX?: number;
  bgColor?: string;
}

export function Skeleton({ 
  children,
  bgColor,
  paddingX = 0,
  paddingY = 0,
}: SkeletonProps) {
  return (
    <Container
      bgColor={bgColor}
      paddingX={paddingX}
      paddingY={paddingY}
    >
      {children}
    </Container>
  )
}