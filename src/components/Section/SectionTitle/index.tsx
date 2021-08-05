import React from 'react';

import { Container, Title } from './styles';

type SectionTitleProps = {
  titles: string[];
}

export function SectionTitle({ titles }: SectionTitleProps) {
  return (
    <Container>
      {
        titles.length > 0 && titles.map(title => (
          <Title key={title}>{title}</Title>
        ))
      }
    </Container>
  )
}