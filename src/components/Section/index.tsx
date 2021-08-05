import React, { ReactNode } from 'react';

import { Container } from './styles';

type SectionProps = {
  children: ReactNode;
}

export function Section({ children }: SectionProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}