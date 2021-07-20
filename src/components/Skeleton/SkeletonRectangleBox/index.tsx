import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

type SkeletonRectangleBoxProps = {
  size: 'small' | 'medium' | 'large';
  bgColor: string;
  indicatorColor: string;
}

export function SkeletonRectangleBox({ size, indicatorColor, bgColor }: SkeletonRectangleBoxProps) {
  return (
    <Container size={size} bgColor={bgColor}>
      <ActivityIndicator 
        size={size === 'small' ? 'small' : 'large'} 
        color={indicatorColor} 
      />
    </Container>
  )
}