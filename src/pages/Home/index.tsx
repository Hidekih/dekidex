import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Colors from '../../styles/colors';
import { captalize } from '../../utils/captalize';
import { generatePokedexNumber } from '../../utils/generatePokedexNumber';
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

const FIRST_URI_TO_FETCH = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

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
  const [ pokemons, setPokemons ] = useState<PokemonListed[]>([]);
  const [ nextUri, setNextUri ] = useState('');
  const [ isLoading, setIsLoading ]= useState(false);
  const [ loadedAll, setLoadedAll ]= useState(false);

  const { navigate } = useNavigation();
  
  useEffect(() => {
    setIsLoading(true);
    fetchData(FIRST_URI_TO_FETCH);
    setIsLoading(false);
  }, []);

  const fetchData = useCallback(async(uri: string) => {
    if (loadedAll) {
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.get<PokeApiResponse>(uri);
      setNextUri(data.next);

      if (data.results.length < 20) {
        setLoadedAll(true);
      }

      const parsedData = data.results.map<PokemonListed>(pokemon => {
        const [, endOfUrl ] = pokemon.url.split('pokemon/');
        const [ id, ] = endOfUrl.split('/');

        return {
          id: generatePokedexNumber(id),
          name: captalize(pokemon.name),
          avatar: createAvatarLink(id),
          url: pokemon.url,
        }
      });

      setPokemons(state => {
        return [ 
          ...state,
          ...parsedData 
        ]
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [loadedAll, nextUri]);

  const handleReFetch  = useCallback(async(distance: number) => {
    if (distance < 1) {
      return;
    }

    fetchData(nextUri);
  }, [nextUri]);

  const handleSelectPokemon = useCallback((url: string) => {
    navigate('Pokemon', { url });
  }, [navigate]);

  return (
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
              handleReFetch(distanceFromEnd);
            }}
            renderItem={( { item: pokemon } ) => (
              <ButtonCover key={pokemon.id} >
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
                    color={Colors.title} 
                  />
                : <></>
            )}
          />
        </PokeListContainer>
      </Content>
    </Container>
  )
}