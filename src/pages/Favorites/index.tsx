import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

import { FavoritedPokemon } from '../../utils/types';
import { load, remove } from '../../storage/favorites';
import Colors from '../../styles/colors';

import { 
  Container, 
  Header, 
  HeaderTitle, 
  Content,
  PokeList,
  PokeInfoContainer,
  GradientBackground,
  PokeImage,
  PokeData,
  PokeBasicsContainer,
  PokeName,
  PokeNumber,
  BoldText,
  PokeTypesContainer,
  TypeBadge,
  BadgeTitle,

  RemoveButtonContainer,
} from './styles';
import { TouchableOpacity, View } from 'react-native';

export function Favorites() {
  const [ favorites, setFavorites ] = useState<FavoritedPokemon[]>([]);
  const { addListener, removeListener } = useNavigation();
  const { navigate } = useNavigation();

  useEffect(() => {
    const navigationFocusListener = addListener('focus', () => {
      fetchFavorites();
    });
    
    return () => {
      removeListener('focus', navigationFocusListener);
    };
  }, []);

  async function fetchFavorites(): Promise<void> {
    const response = await load();
    setFavorites(response);
  }

  async function handleRemove(id: string) {
    const response = await remove(id);

    if (response) {
      setFavorites(response);
    }
  }

  const handleSelectPokemon = useCallback((url: string) => {
    navigate('Pokemon', { url });
  }, [navigate]);
  
  return (
    <Container>
      <Header>
        <HeaderTitle>Favorites</HeaderTitle>
      </Header>
      
      <Content>
        <PokeList
          showsVerticalScrollIndicator={false}
        >
          { favorites.length > 0 && favorites.map(favorite => (
            <Swipeable
              key={favorite.id}
              renderRightActions={() => (
                <RemoveButtonContainer>
                  <TouchableOpacity onPress={() => handleRemove(favorite.id)} style={{ marginRight: 16, marginTop: 8 }}>
                    <Ionicons name="ios-trash-outline" size={32} color={Colors.title} />
                  </TouchableOpacity>
                </RemoveButtonContainer>
              )}
            >
              <PokeInfoContainer onPress={() => handleSelectPokemon(favorite.url)} >
                <GradientBackground 
                  start={{x: 0, y: 1}} end={{x: 1, y: -1}}
                  colors={[ Colors.type[favorite.types[0].type], Colors.background[3] ]}
                />
                <PokeImage 
                  height={100} 
                  width={100} 
                  source={{ uri: favorite.avatar }}
                />
                <PokeData>
                  <PokeBasicsContainer>    
                    <PokeName>
                      {favorite.name}
                    </PokeName>
                    <PokeNumber>
                      {'#'}
                      <BoldText>{favorite.pokedex_Number}</BoldText>
                    </PokeNumber>
                  </PokeBasicsContainer>
                  <PokeTypesContainer>
                    { favorite.types.map(type => (
                      <TypeBadge key={type.slot} typeColor={type.type}>
                        <BadgeTitle>
                          {type.name}
                        </BadgeTitle>
                      </TypeBadge>
                    ))}       
                  </PokeTypesContainer>
                </PokeData>                
              </PokeInfoContainer>
            </Swipeable>
          ))}
        </PokeList>
      </Content>
    </Container>
  )
}