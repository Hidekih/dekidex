import React from 'react';
import { RowDividerGradient } from '../../RowDividerGradient';

import { Container, Column, Name, Value } from './styles';

type RowContentProps = {
  name: string;
  value: number | string;
}

type SectionRowContentProps = {
  data: RowContentProps[];
  colors: string[];
}

export function SectionRowContent({ data, colors }: SectionRowContentProps) {
  return (
    <>
      <RowDividerGradient 
        colors={[colors[0], colors[1]]} 
      />
      <Container>
        {
          data.length > 0 && data.map((content, index) => (
            <Column key={index}>
              <Name>
                {content.name}
              </Name>
              <Value>
                {content.value}
              </Value>
            </Column>
          ))
        }
      </Container>
    </>
  )
}