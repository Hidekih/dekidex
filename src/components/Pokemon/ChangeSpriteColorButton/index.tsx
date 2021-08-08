import React from 'react';

import { Container, ToggleButtonTitle } from './styles';

type ChangeSpriteColorButtonProps = {
  disabled: boolean;
  handleToggleSprite: () => void;
  title: string;
  isSelected: boolean;
}

export function ChangeSpriteColorButton({ 
  disabled, 
  handleToggleSprite, 
  isSelected, 
  title 
}: ChangeSpriteColorButtonProps) {
  return (
    <Container 
      disabled={disabled}
      onPress={handleToggleSprite}
    >
      { isSelected ? (
        <ToggleButtonTitle isSelected={true}>
          {title}
        </ToggleButtonTitle>
      ) : (
        <ToggleButtonTitle isSelected={false}>
          {title}
        </ToggleButtonTitle>
      )}
    </Container>
  )
}