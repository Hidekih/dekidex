import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { captalize } from '../../utils/captalize';
import { PokemonData, CurrentSprites } from '../../utils/types';
import Colors from '../../styles/colors';
import { findOne, save, remove } from '../../storage/favorites';

import { 
  Container, 
  Header, 
  IconButtonContainer, 
  HeaderTitle, 
  Content,
  RowDivider,
  PokeDataDisplay,
  PokemonSpriteControllers,
  SpriteColorController,
  SpriteGenderController,
  ChangeSpriteGenderButton,
  PokemonAvatarContainer,
  GradientBackground,
  PokeImage,
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
} from './styles';
import { generatePokedexNumber } from '../../utils/generatePokedexNumber';
import { ChangeSpriteColorButton } from './ChangeSpriteColorButton';


export function createAvatarLink(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
} 

function createPokemonUrl(id: number) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`;
}

type RoutePrams = {
  url: string;
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
  sprites: {
    back_default: string;
    back_female?: string | null;
    back_shiny: string;
    back_shiny_female?: string | null;
    front_default: string;
    front_female?: string | null;
    front_shiny: string;
    front_shiny_female?: string | null;
    versions: {
      "generation-i": {
        "red-blue": {
          [key: string]: string;
        }
      },
      [key: string]: {
        [key: string]: {
          
        }
      }
    }
  },
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
  const [ isFetching, setIsFetching ] = useState(true);
  const [ isFavorited, setIsFavorited ] = useState(false);
  const [ colorSprite, setColorSprite ] = useState<'normal' | 'shiny'>('normal');
  const [ genderSprite, setGenderSprite ] = useState<'male' | 'female'>('male');
  
  const [ currentSprites, setCurrentSprites ] = useState<CurrentSprites>({} as CurrentSprites);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  function fetchData(pokemonUrl: string) {
    axios.get<PokemonDataResponse>(pokemonUrl)
      .then(response => {
        const { data } = response;

        const separetedUrl = pokemonUrl.split('pokemon/');
        const [ ,endpoint ] = separetedUrl;
        const id = endpoint.replace('/','');  

        const parsedData = {
          id: String(id).trim(),
          pokedexNumber: generatePokedexNumber(id.trim()),
          name: captalize(response.data.name),
          ability: response.data.abilities.map(data => {
            return data.ability.name;
            
          }).join(' / '),
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types.map(data => {
            return {
              slot: String(data.slot),
              type: data.type.name.toLowerCase(),
            }
          }),
          sprites: {
            versions: {
              default: {
                back_default: data.sprites.back_default,
                back_female: data.sprites.back_female,
                back_shiny: data.sprites.back_shiny,
                back_shiny_female: data.sprites.back_shiny_female,
                front_default: data.sprites.front_default,
                front_female: data.sprites.front_female,
                front_shiny: data.sprites.front_shiny,
                front_shiny_female: data.sprites.front_shiny_female,
              },
            },
          },
          url,
          is_unique_gender: !data.sprites.back_female,
        } as PokemonData;

        const {
          back_default,
          back_female,
          back_shiny,
          back_shiny_female,
          front_default,
          front_female,
          front_shiny,
          front_shiny_female,
        } = parsedData.sprites.versions.default;
        
        setCurrentSprites({
          normal: {
            female: {
              front: front_female,
              back: back_female,
            },
            male: {
              front: front_default,
              back: back_default,
            }
          },
          shiny: {
            female: {
              front: front_shiny_female,
              back: back_shiny_female,
            },
            male: {
              front: front_shiny,
              back: back_shiny
            }
          }
        });

        setColorSprite('normal');
        setGenderSprite('male');

        setPokemon(parsedData);
        
        findOne(parsedData.id).then(res => {
          setIsFavorited(!!res);
        })
      })
        .catch(_ => { return })
        .finally(() => setIsFetching(false));
  }


  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleToggleColorSprite = useCallback((string: 'normal' | 'shiny') => {
    setColorSprite(string);
  }, []);

  const handleToggleGenderSprite = useCallback((string: 'male' | 'female') => {
    setGenderSprite(string);
  }, []);

  const handleNextPokemon = useCallback(() => {
    if ((Number(pokemon.id) + 1) >= 10000){
      return;
    }

    const newUrl = createPokemonUrl(Number(pokemon.id) + 1);
    fetchData(newUrl);
  }, [pokemon.id]);

  const handlePreviousPokemon = useCallback(() => {
    if ((Number(pokemon.id) - 1) < 1) {
      return;
    }

    const newUrl = createPokemonUrl(Number(pokemon.id) - 1);
    fetchData(newUrl);
  }, [pokemon.id]);

  const handleFavorited = useCallback((id: string) => {
    if (isFavorited) {
      remove(pokemon.id);
      setIsFavorited(false);
      return;
    }

    save(pokemon);
    setIsFavorited(true);
  }, [isFavorited, pokemon]);

  if (isFetching || !pokemon.name) {
    return (
      <Container> 
        <Header>
          <HeaderTitle>Loading...</HeaderTitle>
        </Header>

        <Content>

        </Content>
      </Container>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Container>
        <Header>
          <IconButtonContainer onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={32} color={Colors.title} />
          </IconButtonContainer>
          <HeaderTitle>{`${pokemon.name} #${pokemon.pokedexNumber}`}</HeaderTitle>
          <IconButtonContainer onPress={() => handleFavorited(pokemon.id)}>
            { isFavorited ? (
              <Ionicons name="md-heart-sharp" size={32} color={Colors.title} />
            ): (
              <Ionicons name="md-heart-outline" size={32} color={Colors.title} />
            )}
          </IconButtonContainer>
        </Header>

        <Content>
          <PokeDataDisplay>
              <PokemonSpriteControllers typeColor={Colors.type[pokemon.types[0].type || '#333']}>
                <SpriteColorController>
                  <ChangeSpriteColorButton 
                    disabled={!currentSprites.shiny.male.front}
                    handleToggleSprite={() => handleToggleColorSprite('normal')}
                    isSelected={colorSprite === 'normal'}
                    title="Normal"
                  />
                  <ChangeSpriteColorButton 
                    disabled={!currentSprites.shiny.male.front}
                    handleToggleSprite={() => handleToggleColorSprite('shiny')}
                    isSelected={colorSprite === 'shiny'}
                    title="Shiny"
                  />
                </SpriteColorController>

                <SpriteGenderController>
                  <ChangeSpriteGenderButton 
                    disabled={!currentSprites.normal.female.front}
                    onPress={() => handleToggleGenderSprite('male')}
                  >
                    { genderSprite === 'male' && !pokemon.is_unique_gender ? (
                      <MaterialCommunityIcons  name="gender-male" size={26} color={"#438FE6"}/>
                    ) : (
                      <MaterialCommunityIcons  name="gender-male" size={28} color={Colors.background[5]}/>
                    )}
                  </ChangeSpriteGenderButton>
                  <ChangeSpriteGenderButton 
                    disabled={!currentSprites.normal.female.front}
                    onPress={() => handleToggleGenderSprite('female')}
                  >
                    { genderSprite === 'female' ? (
                      <MaterialCommunityIcons  name="gender-female" size={26} color={"#DB736E"}/>
                    ) : (
                      <MaterialCommunityIcons  name="gender-female" size={28} color={Colors.background[5]}/>
                    )}
                  </ChangeSpriteGenderButton>
                </SpriteGenderController>
              </PokemonSpriteControllers>

            <PokemonAvatarContainer>
              <GradientBackground
                colors={[ Colors.type[pokemon.types[0].type], Colors.background[5]]}
              />
              <PokeImage 
                resizeMode='cover'
                source={{ uri: currentSprites[colorSprite][genderSprite].front || '' }}
              />
              <PokeImage 
                resizeMode='cover'
                source={{ uri: currentSprites[colorSprite][genderSprite].back || '' }}
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
              <Ionicons name="ios-chevron-back" size={44} color={Colors.title}/>
            </IconButtonContainer>

            {/* <ActivityIndicator size="large" color={Colors.title} /> */}

            <IconButtonContainer onPress={handleNextPokemon} >
              <Ionicons name="ios-chevron-forward" size={44} color={Colors.title} />
            </IconButtonContainer>
          </SwitchController>
        </Content>
      </Container>
    </SafeAreaView>
  )
}