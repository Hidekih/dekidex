import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { captalize } from '../../utils/captalize';
import { PokemonData } from '../../utils/types';
import Colors from '../../styles/colors';

import { 
  Container, 
  Header, 
  IconButtonContainer, 
  HeaderTitle, 
  Content,
  RowDivider,
  PokeDataDisplay,
  PokemonAvatarContainer,
  PokeImage,
  PokedexNumber,
  TextBold,
  DataTitle,
  DataValueContainer,
  DataValue,
  PokemonInfoContainer,
  PokemonRowContainer,
  PokemonRowWithColumnContainer,
  PokemonRowColumn,
  TypeBadge,
  BadgeTitle,
  SwitchController,
  SwitchControllerText,
} from './styles';
import { formatPokedexNumber } from '../../utils/formatPokedexNumber';

type RoutePrams = {
  url: string;
}

export function createAvatarLink(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
} 

function createPokemonUrl(id: number) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`;
}

type PokemonDataResponse = {
  id: string;
  abilities: [
    {
      ability: {
        name: string;
      }
    }
  ]
  name: string;
  back_default: string;
  front_default: string;
  types: [
    {
      slot: number;
      type: {
        name: string;
      }
    }
  ];
  height: number;
  weight: number;
}

export function Pokemon() {
  const route = useRoute();
  const { goBack } = useNavigation();
  const { url } = route.params as RoutePrams;
  const [ pokemon, setPokemon ] = useState<PokemonData>({} as PokemonData);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ isFavorited, setIsFavorited ] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios.get<PokemonDataResponse>(url)
      .then(response => {
        const separetedUrl = url.split('pokemon/');
        const [ ,endpoint ] = separetedUrl;
        const id = endpoint.replace('/','');  

        const parsedData = {
          id: String(id).trim(),
          pokedexNumber: formatPokedexNumber(id.trim()),
          name: captalize(response.data.name),
          ability: response.data.abilities.map(data => {
            return data.ability.name;
            
          }).join(' / '),
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id.trim()}.png`,
          back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id.trim()}.png`,
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types.map(data =>{
            return {
              slot: String(data.slot),
              type: data.type.name.toLowerCase(),
            }
          })
        } as PokemonData;

        setPokemon(parsedData);
        console.log('Fetch');
      })
        .catch(err => console.error(err))
        .finally(() => setIsFetching(false));
  }, [url]);
  

  function fetchData(pokemonUrl: string) {
    axios.get<PokemonDataResponse>(pokemonUrl)
      .then(response => {
        const separetedUrl = pokemonUrl.split('pokemon/');
        const [ ,endpoint ] = separetedUrl;
        const id = endpoint.replace('/','');  

        const parsedData = {
          id: String(id).trim(),
          pokedexNumber: formatPokedexNumber(id.trim()),
          name: captalize(response.data.name),
          ability: response.data.abilities.map(data => {
            return data.ability.name;
            
          }).join(' / '),
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id.trim()}.png`,
          back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id.trim()}.png`,
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types.map(data =>{
            return {
              slot: String(data.slot),
              type: data.type.name.toLowerCase(),
            }
          })
        } as PokemonData;

        setPokemon(parsedData);
        console.log('Fetch');
      })
        .catch(err => console.error(err))
        .finally(() => setIsFetching(false));
  }

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleNextPokemon = useCallback(() => {
    const newUrl = createPokemonUrl(Number(pokemon.id) + 1);
    console.log(newUrl);
    fetchData(newUrl);
  }, [pokemon.id]);

  const handlePreviousPokemon = useCallback(() => {
    if ((Number(pokemon.id) - 1) < 1) {
      return;
    };

    const newUrl = createPokemonUrl(Number(pokemon.id) - 1);
    fetchData(newUrl);
  }, [pokemon.id]);

  if (isFetching || !pokemon.name) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container> 
          <Header>
            <HeaderTitle>Loading...</HeaderTitle>
          </Header>

          <Content>

          </Content>
        </Container>
      </SafeAreaView>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }} >
      <Container>
        <Header>
          <IconButtonContainer onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={32} color={Colors.white} />
          </IconButtonContainer>
          <HeaderTitle>{pokemon.name}</HeaderTitle>
          <IconButtonContainer onPress={() => console.log('Favorited!')}>
            { isFavorited ? (
              <Ionicons name="md-heart-sharp" size={32} color={Colors.white} />
            ): (
              <Ionicons name="md-heart-outline" size={32} color={Colors.white} />
            )}
          </IconButtonContainer>
        </Header>

        <Content>

          <PokeDataDisplay>
            <PokedexNumber>
              #
              <TextBold>{pokemon.pokedexNumber}</TextBold>
            </PokedexNumber>
            <PokemonAvatarContainer>
              <PokeImage 
                resizeMode='cover'
                source={{ uri: pokemon.front_default }}
              />
              <PokeImage 
                resizeMode='cover'
                source={{ uri: pokemon.back_default }}
              />
            </PokemonAvatarContainer>

            <PokemonInfoContainer>
              <PokemonRowContainer>
                <DataTitle>
                  Type
                </DataTitle>
                <DataValueContainer>
                  {pokemon.types.map(type => (
                    <TypeBadge key={type.slot} typeColor={type.type} >
                      <BadgeTitle typeColor={type.type} >
                        {captalize(type.type)}
                      </BadgeTitle>
                    </TypeBadge>
                  ))}
                </DataValueContainer>
              </PokemonRowContainer>
              <RowDivider />

           
                <PokemonRowWithColumnContainer>
                  <PokemonRowColumn>
                    <DataTitle>
                      Height
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.height}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>

                  <PokemonRowColumn>
                    <DataTitle>
                      Weight
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.weight}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>
                </PokemonRowWithColumnContainer>
              
              <RowDivider />

              <PokemonRowContainer>
                <DataTitle>
                  Ability
                </DataTitle>
                <DataValueContainer>
                  <DataValue>{pokemon.ability}</DataValue>
                </DataValueContainer>
              </PokemonRowContainer>
            </PokemonInfoContainer>
          </PokeDataDisplay>

          <SwitchController>
            <IconButtonContainer onPress={handlePreviousPokemon} >
              <Ionicons name="ios-chevron-back" size={40} color={Colors.grayLight}/>
              <SwitchControllerText>
                Previous
              </SwitchControllerText>
            </IconButtonContainer>

            {/* <ActivityIndicator size="large" color={Colors.white} /> */}

            <IconButtonContainer onPress={handleNextPokemon} >
              <SwitchControllerText>
                Next
              </SwitchControllerText>
              <Ionicons name="ios-chevron-forward" size={40} color={Colors.grayLight} />
            </IconButtonContainer>
          </SwitchController>
        </Content>
      </Container>
    </SafeAreaView>
  )
}