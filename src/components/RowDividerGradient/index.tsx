import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { Container } from './styles';

type RowDividerProps = {
  colors?: [ string, string ];
}

export function RowDividerGradient({ colors }: RowDividerProps) {
  return (
    <Container>
      {colors && (
        <LinearGradient
          start={{x: 0, y: 1}} end={{x: 1, y: 1}}
          colors={colors}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        />
      )}
    </Container>
  )
}