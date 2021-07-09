import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

import { captalize } from '../../utils/captalize';
import { PokemonData } from '../../utils/types';
import Colors from '../../styles/colors';

import pokeballImg from '../../assets/pokeball-icon.png';

import { 
  Container, 
  Header, 
  IconButtonContainer, 
  HeaderTitle, 
  Content,
  PokeDataDisplay,
  PokeAvatarContainer,
  PokeImage,
  PokedexNumber,
  TextBold,
} from './styles';
import { formatPokedexNumber } from '../../utils/formatPokedexNumber';

type RoutePrams = {
  url: string;
}

export function createAvatarLink(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
} 

export function Pokemon() {
  const route = useRoute();
  const { goBack } = useNavigation();
  const { url } = route.params as RoutePrams;
  const [ pokemon, setPokemon ] = useState<PokemonData>({} as PokemonData);
  const [ isFetching, setIsFetching ] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios.get<PokemonData>(url)
      .then(response => {
        const separetedUrl = url.split('pokemon/');
        const [ ,id ] = separetedUrl;
        const pokedexNumber = id.replace('/','');  

        const parsedData = {
          id: formatPokedexNumber(pokedexNumber.trim()),
          name: captalize(response.data.name),
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber.trim()}.png`,
          back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokedexNumber.trim()}.png`,
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types, 
        } as PokemonData;

        setPokemon(parsedData);
      })
        .catch(err => console.error(err))
        .finally(() => setIsFetching(false));
  }, [url]);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  if (isFetching || !pokemon.name) {
    return (
      <Container> 
        <Header>
          <HeaderTitle>Loading...</HeaderTitle>
        </Header>

        <Content>

        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <IconButtonContainer onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={32} color={Colors.white} />
        </IconButtonContainer>
        <HeaderTitle>{pokemon.name}</HeaderTitle>
        <IconButtonContainer onPress={() => console.log('Favorited!')}>
          <Ionicons name="md-heart-outline" size={32} color={Colors.white} />
          {/* <Ionicons name="md-heart-sharp" size={32} color={Colors.white} /> */}
        </IconButtonContainer>
      </Header>

      <Content>
        
        <PokeDataDisplay>
          <PokedexNumber>
            #
            <TextBold>{pokemon.id}</TextBold>
          </PokedexNumber>
          <PokeAvatarContainer>
            <PokeImage 
              resizeMode='cover'
              source={{ uri: pokemon.front_default }}
            />
            <PokeImage 
              resizeMode='cover'
              source={{ uri: pokemon.back_default }}
            />
          </PokeAvatarContainer>
        </PokeDataDisplay>
      </Content>
    </Container>
  )
}