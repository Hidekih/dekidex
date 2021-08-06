import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export type SkeletonContentProps = {
  bgColor: string;
  indicatorColor: string;
  mt?: number;
  w: string;
  h: string;
}

export function SkeletonContent({ 
  bgColor,
  indicatorColor, 
  mt = 0,
  w,
  h,
}: SkeletonContentProps) {
  return (
    <Container 
      bgColor={bgColor}
      mt={mt}
      w={w}
      h={h}
    >
      <ActivityIndicator 
        size="large" 
        color={indicatorColor} 
      />
    </Container>
  )
}