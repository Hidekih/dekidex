import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { captalize } from '../../utils/captalize';
import { createPokemonUrl } from '../../utils/createPokemonUrl';
import { PokemonData, CurrentSprites } from '../../utils/types';
import { generatePokedexNumber } from '../../utils/generatePokedexNumber';
import { findOne, save, remove } from '../../storage/favorites';

import { ChangeSpriteColorButton } from '../../components/ChangeSpriteColorButton';
import { Skeleton } from '../../components/Skeleton';
import { SkeletonContent } from '../../components/Skeleton/SkeletonContent';
import { SkeletonRowBox } from '../../components/Skeleton/SkeletonRowBox';
import { Section } from '../../components/Section';
// import { RowDividerGradient } from '../../components/RowDividerGradient';
import { SwitchController } from '../../components/Home/SwitchController';
import { SectionTitle } from '../../components/Section/SectionTitle';
import { SectionRowContent } from '../../components/Section/SectionRowContent';
import { TypeBadge } from '../../components/TypeBadge';

import { MovesList } from '../../components/Home/MovesList';

import Colors from '../../styles/colors';
import { 
  Container, 
  Header, 
  IconButtonContainer, 
  HeaderTitle, 
  Content,
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
  RowContent,
} from './styles';

type RoutePrams = {
  url: string;
}

interface PokemonDataResponse extends Omit<PokemonData, 'ability' | 'sprites' | 'types' | 'stats' > {
  abilities: [
    {
      ability: {
        name: string;
      }
    }
  ];
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
  };
  types: [
    {
      slot: number;
      type: {
        name: string;
      }
    }
  ];
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
      }
    },
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
      }
    }
  ],
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
    setIsFetching(false)
  }, []);

  function fetchData(pokemonUrl: string) {
    axios.get<PokemonDataResponse>(pokemonUrl)
      .then(response => {
        const { data } = response;

        const [ ,enfOfUrl ] = pokemonUrl.split('pokemon/');
        const id = enfOfUrl.replace('/','').trim();  

        const parsedData = {
          id: String(id),
          pokedexNumber: generatePokedexNumber(id),
          name: captalize(data.name),
          ability: data.abilities.map(({ ability }) => {
            return ability.name;
          }).join(' / '),
          height: (data.height * 0.1).toFixed(1) || 0,
          weight: (data.weight * 0.1).toFixed(1) || 0,
          types: data.types.map(({ slot, type }) => {
            return {
              slot: String(slot),
              type: type.name.toLowerCase(),
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
          stats: data.stats.map(({ base_stat, effort,stat }) => {
            return {
              base_stat,
              effort,
              name: stat.name,
            }
          }),
          moves: data.moves,
          base_experience: data.base_experience,
          url,
          is_unique_gender: !data.sprites.front_female,
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
              back: back_female || back_default,
            },
            male: {
              front: front_default,
              back: back_default,
            }
          },
          shiny: {
            female: {
              front: front_shiny_female,
              back: back_shiny_female || back_shiny,
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

  const handleChangePokemon = useCallback((mode: 'next' | 'previous' ) => {
    if ((Number(pokemon.id) + 1) >= 10000){
      return;
    }

    let newUrl = '';

    if (mode === 'next') {
      newUrl = createPokemonUrl(Number(pokemon.id) + 1);
    } else if (mode === 'previous') {
      newUrl = createPokemonUrl(Number(pokemon.id) - 1);
    }

    fetchData(newUrl);
  }, [pokemon.id]);

  const handleFavorited = useCallback(() => {
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
      <Skeleton paddingX={16} paddingY={0}>
        <SkeletonRowBox h="60px" w="100%">
          <SkeletonContent 
            bgColor={Colors.background[3]} 
            indicatorColor={'transparent'} 
            w="50px"
            h="50px"
          />
          <SkeletonContent 
            bgColor={Colors.background[3]} 
            indicatorColor={Colors.background[1]} 
            w="160px"
            h="50px"
          />
          <SkeletonContent 
            bgColor={Colors.background[3]} 
            indicatorColor={'transparent'} 
            w="50px"
            h="50px"
          />
        </SkeletonRowBox>

        <SkeletonContent 
          bgColor={Colors.background[3]} 
          indicatorColor={Colors.background[1]} 
          mt={16}
          w="100%"
          h="188px"
        />
        <SkeletonContent 
          bgColor={Colors.background[3]} 
          indicatorColor={Colors.background[1]} 
          mt={16}
          w="100%"
          h="160px"
        />
        <SkeletonContent 
          bgColor={Colors.background[3]} 
          indicatorColor={Colors.background[1]} 
          mt={16}
          w="100%"
          h="160px"
        />

        
      </Skeleton>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Container>
        <Header>
          <IconButtonContainer onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={28} color={Colors.title} />
          </IconButtonContainer>
          <HeaderTitle>{pokemon.name}</HeaderTitle>
          <IconButtonContainer onPress={handleFavorited}>
            { isFavorited ? (
              <Ionicons name="md-heart-sharp" size={28} color={Colors.title} />
            ) : (
              <Ionicons name="md-heart-outline" size={28} color={Colors.title} />
            )}
          </IconButtonContainer>
        </Header>

        <Content>
          <PokeDataDisplay>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
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
                      <Ionicons  name="male" size={26} color={"#438FE6"}/>
                    ) : (
                      <Ionicons  name="male" size={28} color={Colors.background[1]}/>
                    )}
                  </ChangeSpriteGenderButton>
                  <ChangeSpriteGenderButton 
                    disabled={!currentSprites.normal.female.front}
                    onPress={() => handleToggleGenderSprite('female')}
                  >
                    { genderSprite === 'female' ? (
                      <Ionicons  name="female" size={26} color={"#DB736E"}/>
                    ) : (
                      <Ionicons  name="female" size={28} color={Colors.background[1]}/>
                    )}
                  </ChangeSpriteGenderButton>
                </SpriteGenderController>
              </PokemonSpriteControllers>

              <PokemonAvatarContainer>
                <GradientBackground
                  colors={[ Colors.type[pokemon.types[0].type], Colors.background[3]]}
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
              
              <Section>
                <RowContent>
                  <DataTitle>
                    Type
                  </DataTitle>
                  <DataValueContainer>
                    {
                      pokemon.types.map(type => (
                        <TypeBadge key={type.slot} type={type.type} />
                      ))
                    }
                  </DataValueContainer>
                </RowContent>

                <SectionRowContent 
                  data={[
                    { name: 'Height', value: `${pokemon.height} m` },
                    { name: 'Weight', value: `${pokemon.weight} kg` },
                  ]}
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]}
                />

                <SectionRowContent 
                  data={[
                    { name: 'Ability', value: pokemon.ability },
                  ]}
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]}
                />
              </Section>
              
              <Section>   
                <SectionTitle titles={["Base stats"]}/>
                
                <SectionRowContent 
                  data={[
                    { name: 'Hp', value: pokemon.stats[0].base_stat },
                    { name: 'Sp.Atk', value: pokemon.stats[3].base_stat }
                  ]}
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]}
                />

                <SectionRowContent 
                  data={[
                    { name: 'Atk', value: pokemon.stats[1].base_stat },
                    { name: 'Sp.Def', value: pokemon.stats[4].base_stat }
                  ]}
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]}
                />

                <SectionRowContent 
                  data={[
                    { name: 'Def', value: pokemon.stats[2].base_stat },
                    { name: 'Spd', value: pokemon.stats[5].base_stat }
                  ]}
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]}
                />

                <SectionRowContent 
                  data={[
                    { name: 'Experience', value: `${pokemon.base_experience}` },
                  ]}
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]}
                />
              </Section>      

              <Section>
                <MovesList data={{
                  moves: pokemon.moves,
                  colors: [ Colors.title, Colors.type[pokemon.types[0].type ]]
                }}/>
              </Section>

            </ScrollView>
          </PokeDataDisplay>

          <SwitchController
            pokedexNumber={pokemon.pokedexNumber}
            isFirstPokemon={pokemon.id === '1'}
            handlePreviousPokemon={() => handleChangePokemon('previous')}
            handleNextPokemon={() => handleChangePokemon('next')}
          />
        </Content>
      </Container>
    </SafeAreaView>
  )
}