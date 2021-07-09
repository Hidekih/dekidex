import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

import Colors from '../../styles/colors';
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
  ButtonCover,
  PokeInfoButton,
  PokeImage,
  PokeData,
  ImageContainer,
  PokeBasics,
  PokeName,
  PokeNumber,
  BoldText,
} from './styles';
import { useNavigation } from '@react-navigation/native';

type PokeApiResponse = {
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

  const { navigate } = useNavigation();
  
  useEffect(() => {
    pokeApi.get<PokeApiResponse>('/pokemon')
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
      })
      .catch(err => console.error(err));
  }, []);

  const fetchData = useCallback(async(distance: number) => {
    if (distance < 1) {
      return;
    }

    if (loadedAll) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get<PokeApiResponse>(nextUri);
      setNextUri(response.data.next);

      if (response.data.results.length < 20) {
        setLoadedAll(true);
      }

      const formatedData = response.data.results.map<PokemonListed>(pokemon => {
        const separetedUrl = pokemon.url.split('pokemon/');
        const [ ,id ] = separetedUrl;
        const pokedexNumber = id.replace('/','');

        return {
          id: formatPokedexNumber(pokedexNumber),
          name: captalize(pokemon.name),
          avatar: createAvatarLink(pokedexNumber),
          url: pokemon.url,
        }
      });

      setPokemons(state => [ ...state, ...formatedData ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  },[nextUri]);

  const handleSelectPokemon = useCallback((url: string) => {
    navigate('Pokemon', { url });
  }, [navigate]);

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
                <ButtonCover key={pokemon.id}>
                  <PokeInfoButton
                    onPress={() => handleSelectPokemon(pokemon.url)} 
                  >
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
                  </PokeInfoButton>
                </ButtonCover>
              )}
              ListFooterComponent={(
                isLoading 
                  ? <ActivityIndicator 
                      style={{ marginVertical: 8 }} 
                      size="large" 
                      color={Colors.white} 
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