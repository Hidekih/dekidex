import React from 'react';
import { LinearGradientProps } from 'expo-linear-gradient';

import { Container } from './styles';

export function BottomShadow({ ...rest }: LinearGradientProps) {
  return <Container {...rest} />
}