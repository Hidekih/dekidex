import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
          <MaterialCommunityIcons name="chevron-double-left" size={50} color={Colors.background[1]}/>
        </IconButton>
      ) : (
        <IconButton onPress={handlePreviousPokemon} >
          <MaterialCommunityIcons name="chevron-double-left" size={50} color={Colors.title}/>
        </IconButton>
      )}

      <Title>#{pokedexNumber}</Title>

      <IconButton onPress={handleNextPokemon} >
        <MaterialCommunityIcons name="chevron-double-right" size={50} color={Colors.title} />
      </IconButton>
    </Container>
  )
}