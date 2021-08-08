import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../../styles/colors';
import { Container, IconButton, Title } from './styles';

type SwitchControllerProps = {
  handlePreviousPokemon: () => void;
  handleNextPokemon: () => void;
  isFirstPokemon: boolean;
  pokedexNumber: string;
}

export function SwitchController({ 
  isFirstPokemon, 
  handlePreviousPokemon, 
  handleNextPokemon, 
  pokedexNumber 
}: SwitchControllerProps) {
  return (
    <Container>
      { isFirstPokemon ? (
        <IconButton disabled >
          <Ionicons name="chevron-back" size={28} color={Colors.background[1]}/>
        </IconButton>
      ) : (
        <IconButton onPress={handlePreviousPokemon} >
          <Ionicons name="chevron-back" size={28} color={Colors.title}/>
        </IconButton>
      )}

      <Title>#{pokedexNumber}</Title>

      <IconButton onPress={handleNextPokemon} >
        <Ionicons name="chevron-forward" size={28} color={Colors.title} />
      </IconButton>
    </Container>
  )
}