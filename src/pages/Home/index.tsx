import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

import Colors from '../../styles/colors';
import { captalize } from '../../utils/captalize';
import { generatePokedexNumber } from '../../utils/generatePokedexNumber';
import { PokemonListed } from '../../utils/types';
import { FilterModal } from '../../components/FilterModal';

import pokeballImg from '../../assets/pokeball-icon.png';

import { 
  Container, 
  Header, 
  HeaderTitle, 
  HeaderFilterButton,
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
import { Skeleton } from '../../components/Skeleton';
import { SkeletonContent } from '../../components/Skeleton/SkeletonContent';

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
  }

  function handleSetStarterListByGen(initial: number) {
    setIsLoading(true);
    setPokemons([]);

    const uri = `https://pokeapi.co/api/v2/pokemon?offset=${initial}&limit=20`;
    fetchData(uri);
    setIsLoading(false);
  };

  const handleReFetch  = useCallback(async(distance: number) => {
    if (distance < 1) {
      return;
    }

    if (loadedAll) {
      return;
    }

    fetchData(nextUri);
  }, [nextUri, loadedAll]);

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
        <View style={{ height: 60, width: 60 }}/>
        <HeaderTitle>Pokedex</HeaderTitle>
        <HeaderFilterButton onPress={handleToggleModal}>
          <Feather name="filter" color={Colors.title} size={28} />
        </HeaderFilterButton>
      </Header>
      
      <Content>
        {
          pokemons.length <= 0 ? (
            <Skeleton paddingX={16}>
              <SkeletonContent 
                bgColor={Colors.background[3]} 
                indicatorColor={Colors.background[1]} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={Colors.background[3]} 
                indicatorColor={Colors.background[1]} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={Colors.background[3]} 
                indicatorColor={Colors.background[1]} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={Colors.background[3]} 
                indicatorColor={Colors.background[1]} 
                mt={8}
                w="100%"
                h="100px"
              />
              <SkeletonContent 
                bgColor={Colors.background[3]} 
                indicatorColor={Colors.background[1]} 
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
                onEndReached={({ distanceFromEnd,  }) => {
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
          )
        }
      </Content>
    </Container>
  )
}