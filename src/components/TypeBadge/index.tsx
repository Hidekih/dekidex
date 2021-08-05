import React from 'react';
import { captalize } from '../../utils/captalize';

import { Container, Title } from './styles';

type TypeBadgeProps = {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const typeNameFormatted = captalize(type);

  return (
    <Container typeColor={type} >
      <Title typeColor={type} >
        {typeNameFormatted}
      </Title>
    </Container>
  )
}