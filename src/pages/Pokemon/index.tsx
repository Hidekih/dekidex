import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { captalize } from '../../utils/captalize';
import { PokemonData, CurrentSprites, MovesByGen, MoveGen, Moves } from '../../utils/types';
import Colors from '../../styles/colors';
import { findOne, save, remove } from '../../storage/favorites';
import { generatePokedexNumber } from '../../utils/generatePokedexNumber';

import { ChangeSpriteColorButton } from './ChangeSpriteColorButton';
import { SkeletonRectangleBox } from '../../components/Skeleton/SkeletonRectangleBox';
import { RowDivider } from '../../components/RowDivider';

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
  DataValue,
  Section,
  RowContainer,
  PokemonRowWithColumnContainer,
  PokemonRowColumn,
  TypeBadge,
  BadgeTitle,
  GameVersionsList,
  GameVersionButton,
  GameVersionTitle,
  MoveRowContainer,
} from './styles';
import { SwitchController } from './SwitchController';

function createPokemonUrl(id: number) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`;
}

function compareLevel( a: MoveGen, b: MoveGen ) {
  if ( a.level_learned_at < b.level_learned_at ){
    return -1;
  }
  if ( a.level_learned_at > b.level_learned_at ){
    return 1;
  }
  return 0;
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
  moves: Moves[];
  base_experience: number;
  height: number;
  weight: number;
}

type VersionGroupResponse = {
  results: [
    { 
      name: string;
    }
  ]
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
  const [ selectedGameVersion, setSelectedGameVersion ] = useState('');
  const [ moves, setMoves ] = useState<MovesByGen>({} as MovesByGen);
  const [ gameVersions, setGameVersions ] = useState<string[]>([]);

  useEffect(() => {
    fetchGamesVersions();
    fetchData(url);
    setIsFetching(false)
  }, []);
  
  function fetchGamesVersions() {
    axios.get<VersionGroupResponse>('https://pokeapi.co/api/v2/version-group/')
      .then(res => {
        const { data } = res;

        const parsedData = data.results.map(version => {
          return version.name
        });

        setSelectedGameVersion(parsedData[0]);
        setGameVersions(parsedData);
      })
  }

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
          height: (data.height*0.1).toFixed(1) || 0,
          weight: (data.weight*0.1).toFixed(1) || 0,
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
          base_experience: data.base_experience,
          url,
          is_unique_gender: !data.sprites.front_female,
        } as PokemonData;

        const movesData: MovesByGen = {} as MovesByGen;

        movesData["red-blue"] = [];
        movesData["yellow"] = [];
        movesData["gold-silver"] = [];
        movesData["crystal"] = [];
        movesData["ruby-sapphire"] = [];
        movesData["emerald"] = [];
        movesData["firered-leafgreen"] = [];
        movesData["diamond-pearl"] = [];
        movesData["platinum"] = [];
        movesData["heartgold-soulsilver"] = [];
        movesData["black-white"] = [];
        movesData["colosseum"] = [];
        movesData["xd"] = [];
        movesData["black-2-white-2"] = [];
        movesData["x-y"] = [];
        movesData["omega-ruby-alpha-sapphire"] = [];
        movesData["sun-moon"] = [];
        movesData["ultra-sun-ultra-moon"] = [];
        movesData["lets-go"] = [];
        movesData["sword-shield"] = [];

        data.moves.forEach(({ move, version_group_details }) => {
          version_group_details.forEach(({ level_learned_at, move_learn_method, version_group }) => {
            try {
              movesData[version_group.name].push({ 
                name: captalize(move.name),
                level_learned_at,
                learn_method: move_learn_method.name,
              });
            } catch (error) {
              return
            }
          });
        });

        Object.keys(movesData).forEach(item => {
          movesData[item].sort(compareLevel);
        });
      
        setMoves(movesData);

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

  const handleSelectGameVersion = useCallback((gameVersion: string) => {
    setSelectedGameVersion(gameVersion);
  }, []);

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
      <Content style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <SkeletonRectangleBox 
          size="small" 
          bgColor={Colors.background[3]} 
          indicatorColor={Colors.title} 
        />

        <SkeletonRectangleBox 
          size="large" 
          bgColor={Colors.background[3]} 
          indicatorColor={Colors.title} 
        />
        
        <SkeletonRectangleBox 
          size="large" 
          bgColor={Colors.background[3]} 
          indicatorColor={Colors.title} 
        />

        <SkeletonRectangleBox 
          size="small" 
          bgColor={Colors.background[3]} 
          indicatorColor={Colors.title} 
        />
      </Content>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Container>
        <Header>
          <IconButtonContainer onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={32} color={Colors.title} />
          </IconButtonContainer>
          <HeaderTitle>{pokemon.name}</HeaderTitle>
          <IconButtonContainer onPress={() => handleFavorited(pokemon.id)}>
            { isFavorited ? (
              <Ionicons name="md-heart-sharp" size={32} color={Colors.title} />
            ) : (
              <Ionicons name="md-heart-outline" size={32} color={Colors.title} />
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
                      <MaterialCommunityIcons  name="gender-male" size={26} color={"#438FE6"}/>
                    ) : (
                      <MaterialCommunityIcons  name="gender-male" size={28} color={Colors.background[1]}/>
                    )}
                  </ChangeSpriteGenderButton>
                  <ChangeSpriteGenderButton 
                    disabled={!currentSprites.normal.female.front}
                    onPress={() => handleToggleGenderSprite('female')}
                  >
                    { genderSprite === 'female' ? (
                      <MaterialCommunityIcons  name="gender-female" size={26} color={"#DB736E"}/>
                    ) : (
                      <MaterialCommunityIcons  name="gender-female" size={28} color={Colors.background[1]}/>
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
                <RowContainer>
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
                </RowContainer>

                <RowDivider 
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                />

                <PokemonRowWithColumnContainer>
                  <PokemonRowColumn>
                    <DataTitle>
                      Height
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.height} m</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>

                  <PokemonRowColumn>
                    <DataTitle>
                      Weight
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.weight} kg</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>
                </PokemonRowWithColumnContainer>
                
                <RowDivider 
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                />

                <RowContainer>
                  <DataTitle>
                    Ability
                  </DataTitle>
                  <DataValueContainer>
                    <DataValue>{pokemon.ability}</DataValue>
                  </DataValueContainer>
                </RowContainer>
              
              </Section>
              
              <Section>   
                <RowContainer>
                  <DataTitle style={{ flex: 1, textAlign: 'center' }}>
                    Base stats
                  </DataTitle>
                </RowContainer>

                <RowDivider 
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                />

                <PokemonRowWithColumnContainer>
                  <PokemonRowColumn>
                    <DataTitle>
                      Hp
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.stats[0].base_stat}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>

                  <PokemonRowColumn>
                    <DataTitle>
                      Sp.Atk
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.stats[3].base_stat}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>
                </PokemonRowWithColumnContainer>

                <RowDivider 
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                />

                <PokemonRowWithColumnContainer>
                  <PokemonRowColumn>
                    <DataTitle>
                      Atk
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.stats[1].base_stat}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>

                  <PokemonRowColumn>
                    <DataTitle>
                      Sp.Def
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.stats[4].base_stat}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>
                </PokemonRowWithColumnContainer>

                <RowDivider 
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                />

                <PokemonRowWithColumnContainer>
                  <PokemonRowColumn>
                    <DataTitle>
                      Def
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.stats[2].base_stat}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>

                  <PokemonRowColumn>
                    <DataTitle>
                      Spd
                    </DataTitle>
                    <DataValueContainer>
                      <DataValue>{pokemon.stats[5].base_stat}</DataValue>
                    </DataValueContainer>
                  </PokemonRowColumn>
                </PokemonRowWithColumnContainer>

                <RowDivider 
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                />

                <RowContainer>
                  <DataTitle>
                    Experience
                  </DataTitle>
                  <DataValueContainer>
                    <DataValue>{pokemon.base_experience} exp</DataValue>
                  </DataValueContainer>
                </RowContainer>
              </Section>      


              <Section>
                <RowContainer>
                  <DataTitle style={{ flex: 1, textAlign: 'center' }}>
                    Moves (select a game)
                  </DataTitle>
                </RowContainer>

                <RowDivider 
                  colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                />

                <GameVersionsList>
                  { gameVersions.length > 0 && gameVersions.map(version => (
                    <GameVersionButton 
                      key={version} 
                      onPress={() => handleSelectGameVersion(version)}
                      isSelected={version === selectedGameVersion}
                    >
                      <GameVersionTitle isSelected={version === selectedGameVersion}>
                        {version}
                      </GameVersionTitle>
                    </GameVersionButton>
                  ))}
                </GameVersionsList>

              </Section>

              <Section>
                <PokemonRowWithColumnContainer>
                  <PokemonRowColumn>
                    <DataTitle>
                      Move title
                    </DataTitle>
                  </PokemonRowColumn>

                  <PokemonRowColumn>
                    <DataTitle>
                      Learn method
                    </DataTitle>
                  </PokemonRowColumn>
                </PokemonRowWithColumnContainer>

                { moves[selectedGameVersion].length > 0 
                  ? moves[selectedGameVersion].map(({ name,learn_method,level_learned_at }, index) => (
                    <View key={index}>
                      <RowDivider 
                        colors={[Colors.subtilte, Colors.type[pokemon.types[0].type]]} 
                      />
                      <MoveRowContainer key={index}>
                        <PokemonRowColumn>
                          <DataValue>
                            {name}
                          </DataValue>
                        </PokemonRowColumn>
                        { learn_method === 'level-up' ? (
                          <PokemonRowColumn>
                            <DataValue>level: {level_learned_at}</DataValue>
                          </PokemonRowColumn>
                        ) : (
                          <PokemonRowColumn>
                            <DataValue>{learn_method}</DataValue>
                          </PokemonRowColumn>
                        )}
                      </MoveRowContainer>
                    </View> 
                )) : (
                  <RowContainer>
                    <DataTitle>
                      {'Impossible to find moves informations about this pokemon :('}
                    </DataTitle>
                  </RowContainer>
                )}
              </Section>

            </ScrollView>
          </PokeDataDisplay>

          <SwitchController
            pokedexNumber={pokemon.pokedexNumber}
            isFirstPokemon={pokemon.id === '1'}
            handlePreviousPokemon={handlePreviousPokemon}
            handleNextPokemon={handleNextPokemon}
          />
        </Content>
      </Container>
    </SafeAreaView>
  )
}