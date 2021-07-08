import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Themes from '../../styles/themes';
import { captalize } from '../../utils/captalize';
import { formatPokedexNumber } from '../../utils/formatPokedexNumber';
import pokeApi from '../../services/pokeapi';
import { PokemonListed } from '../../utils/types';

import pokeballImg from '../../assets/pokeball-icon.png';

import { 
  Container, 
  Header, 
  HeaderTitle, 
  Content, 
  PokeListContainer,
  PokeList,
  PokeInfoContainer,
  PokeImage,
  PokeData,
  ImageContainer,
  PokeBasics,
  PokeName,
  PokeNumber,
  BoldText,
} from './styles';

type PokeApiRequest = {
  next: string;
  results: [
    { 
      name: string;
      url: string;
    }
  ];
}

export function createAvatarLink(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
} 

export function Home() {
  const [ nextUri, setNextUri ] = useState('');
  const [ pokemons, setPokemons ] = useState<PokemonListed[]>([]);
  const [ isLoading, setIsLoading ]= useState(false);
  const [ loadedAll, setLoadedAll ]= useState(false);
  
  useEffect(() => {
    pokeApi.get<PokeApiRequest>('/pokemon')
      .then(response => {
        setNextUri(response.data.next);
        
        const formatedData = response.data.results.map<PokemonListed>(poke => {
          const separetedUrl = poke.url.split('pokemon/');
          const [ ,id ] = separetedUrl;
          const pokedexNumber = id.replace('/','');

          return {
            id: formatPokedexNumber(pokedexNumber),
            name: captalize(poke.name),
            avatar: createAvatarLink(pokedexNumber),
            url: poke.url,
          }
        });

        setPokemons(formatedData);
      });
  }, []);

  const fetchData = useCallback(async(distance: number) => {
    if (distance < 1) {
      return;
    }

    if (loadedAll) {
      return;
    }

    setIsLoading(true);

    axios.get<PokeApiRequest>(nextUri)
      .then(response => {
        setNextUri(response.data.next);

        if (response.data.results.length < 20) {
          setLoadedAll(true);
        }

        const formatedData = response.data.results.map<PokemonListed>(poke => {
          const separetedUrl = poke.url.split('pokemon/');
          const [ ,id ] = separetedUrl;
          const pokedexNumber = id.replace('/','');

          return {
            id: formatPokedexNumber(pokedexNumber),
            name: captalize(poke.name),
            avatar: createAvatarLink(pokedexNumber),
            url: poke.url,
          }
        });

        setPokemons([ ...pokemons, ...formatedData ]);
        setIsLoading(false);
      })
  },[nextUri, pokemons]);

  const handleSelectPokemon = useCallback(async(url: string) => {
    console.log('Navegar para outra página')
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <HeaderTitle>Pokedex</HeaderTitle>
        </Header>
        
        <Content>
          <PokeListContainer>
            <PokeList
              data={pokemons} 
              keyExtractor={data => String(data.id)}
              showsVerticalScrollIndicator={false}
              onEndReached={({ distanceFromEnd }) => {
                fetchData(distanceFromEnd);
              }}
              renderItem={( { item: pokemon } ) => (
                <TouchableOpacity 
                  activeOpacity={0.5}
                  onPress={() => handleSelectPokemon(pokemon.url)} 
                  key={pokemon.id}
                >
                  <PokeInfoContainer>
                    <PokeImage 
                      height={100} 
                      width={100} 
                      source={{ uri: pokemon.avatar }}
                    />
                    <PokeData>
                      <PokeBasics>
                        <PokeName>
                          {captalize(pokemon.name)}
                        </PokeName>
                        <PokeNumber>
                          {'#'}
                          <BoldText>{pokemon.id}</BoldText>
                        </PokeNumber>
                      </PokeBasics>
                      <ImageContainer>
                        <Image 
                          source={pokeballImg} 
                          height={45}
                          width={45}
                          resizeMode="contain"
                          style={{ height: 45, width: 45 }}
                        />   
                      </ImageContainer>
                    </PokeData>     
                  </PokeInfoContainer>
                </TouchableOpacity>
              )}
              ListFooterComponent={(
                isLoading 
                  ? <ActivityIndicator 
                      style={{ marginVertical: 8 }} 
                      size="large" 
                      color={Themes.white} 
                    />
                  : <></>
              )}
            />
          </PokeListContainer>
        </Content>
      </Container>
    </SafeAreaView>
  )
}