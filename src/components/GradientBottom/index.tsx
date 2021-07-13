import React from 'react';
import { LinearGradientProps } from 'expo-linear-gradient';

import { Container } from './styles';

export function GradientBottom({ ...rest }: LinearGradientProps) {
  return <Container {...rest} />
}