import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import { captalize, createAvatarLink, generatePokedexNumber, getGen } from '../../utils/functions';
import { PokemonListed } from '../../utils/types';
import { FilterModal } from '../../components/FilterModal';
import { Skeleton } from '../../components/Skeleton';
import { SkeletonContent } from '../../components/Skeleton/SkeletonContent';

import { 
  Container, 
  Header, 
  HeaderContent,
  HeaderTitle, 
  HeaderFilterButton,
  Content, 
  PokeListContainer,
  PokeList,
  PokemonButton,
  GradientBackground,
  PokeImage,
  PokemonData,
  PrincipalData,
  PokemonName,
  PokemonNumber,
  PokemonGeneration,
} from './styles';
import { useTheme } from 'styled-components';

const FIRST_URI_TO_FETCH = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40';

type PokeApiResponse = {
  next: string;
  results: [
    { 
      name: string;
      url: string;
    }
  ];
}

export function Home() {
  const [ pokemons, setPokemons ] = useState<PokemonListed[]>([]);
  const [ nextUri, setNextUri ] = useState('');
  const [ isLoading, setIsLoading ]= useState(false);
  const [ loadedAll, setLoadedAll ]= useState(false);
  const theme = useTheme();

  const [ isOpen, setIsOpen ] = useState(false);

  const { navigate } = useNavigation();
  
  useEffect(() => {
    setIsLoading(true);
    fetchData(FIRST_URI_TO_FETCH);
    setIsLoading(false);
  }, []);

  async function fetchData(uri: string) {
    try {
      setIsLoading(true);
      const { data } = await axios.get<PokeApiResponse>(uri);
      setNextUri(data.next);

      if (data.results.length < 40) {
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
          gen: getGen(Number(id)),
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
  }

  function handleSetStarterListByGen(initial: number) {
    setIsLoading(true);
    setPokemons([]);

    const uri = `https://pokeapi.co/api/v2/pokemon?offset=${initial}&limit=40`;
    fetchData(uri);
    setIsLoading(false);
  };

  async function handleReFetch(distance: number)  {
    if (distance < 1 || isLoading || loadedAll) {
      return;
    }

    await fetchData(nextUri);
  }

  const handleSelectPokemon = useCallback((url: string) => {
    navigate('Pokemon', { url });
  }, [navigate]);

  const handleToggleModal = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  return (
    <Container>
      <FilterModal 
        animationType="slide"
        visible={isOpen} 
        transparent={true} 
        onRequestClose={handleToggleModal} 
        toggleModal={handleToggleModal}
        handleSetStarterListByGen={handleSetStarterListByGen}
      />

      <Header>
        <HeaderContent>
          <View style={{ height: 60, width: 60 }}/>
          <HeaderTitle>Home</HeaderTitle>
          <HeaderFilterButton onPress={handleToggleModal}>
            <Ionicons name="search" color={theme.shape} size={28} />
          </HeaderFilterButton>
        </HeaderContent>
      </Header>
      
      <Content>
        {
          pokemons.length <= 0 ? (
            <Skeleton paddingX={16}>
              <SkeletonContent 
                bgColor={theme.background2} 
                indicatorColor={theme.background1} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={theme.background2} 
                indicatorColor={theme.background1} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={theme.background2} 
                indicatorColor={theme.background1} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={theme.background2} 
                indicatorColor={theme.background1} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={theme.background2} 
                indicatorColor={theme.background1} 
                mt={8}
                w="100%"
                h="100px"
              />
            </Skeleton>
          ) : (
            <PokeListContainer>
              <PokeList
                data={pokemons} 
                keyExtractor={data => String(data.id)}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
                
                onEndReached={({ distanceFromEnd }) => {
                  handleReFetch(distanceFromEnd);
                }}
                renderItem={( { item: pokemon } ) => (
                  <PokemonButton
                    onPress={() => handleSelectPokemon(pokemon.url)} 
                  >
                    <GradientBackground 
                      colors={[ theme.background1, theme.background2 ]} 
                    />
                    <PokeImage 
                      height={100} 
                      width={100} 
                      source={{ uri: pokemon.avatar }}
                      />
                    <PokemonData>
                      <PrincipalData>
                        <PokemonName>
                          {pokemon.name}
                        </PokemonName>
                        <PokemonNumber>
                          # {pokemon.id}
                        </PokemonNumber>
                      </PrincipalData>
                      <PokemonGeneration>
                        Gen: {pokemon.gen}
                      </PokemonGeneration>
                    </PokemonData>     
                  </PokemonButton>
                )}
                ListFooterComponent={(
                  isLoading 
                    ? <ActivityIndicator 
                        style={{ marginVertical: 8 }} 
                        size="large" 
                        color={theme.text} 
                      />
                    : <></>
                )}
              />
            </PokeListContainer>
          )
        }
      </Content>
    </Container>
  )
}
