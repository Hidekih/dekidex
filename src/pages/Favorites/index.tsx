import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { FavoritedPokemon } from '../../utils/types';
import { load, remove } from '../../storage/favorites';
import { TypeBadge } from '../../components/TypeBadge';

import { 
  Container, 
  Header, 
  HeaderContent,
  HeaderTitle, 
  EmpytContent,
  MessageBox,
  Description,
  Button,
  ButtonTitle,
  Content,
  ListContainer,
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
  RemoveButtonContainer,
} from './styles';

export function Favorites() {
  const theme = useTheme();
  const { goBack } = useNavigation();
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
        <HeaderContent>
          <HeaderTitle>Favorites</HeaderTitle>
        </HeaderContent>
      </Header>

      {
        favorites.length <= 0 ? (
          <EmpytContent>
            <MessageBox>
              <Description>
                Your favorite list is empyt back to start to add favorite pokemons!
              </Description>
              <Button onPress={goBack}>
                <Feather name="arrow-left" size={30} color={theme.shape}/>
                <ButtonTitle>Back To pokedex</ButtonTitle>
              </Button>
            </MessageBox>
          </EmpytContent>
        ) : (
          <Content>
            <ListContainer>
              <PokeList
                showsVerticalScrollIndicator={true}
                keyExtractor={({ id }) => id}
                data={favorites}
                renderItem={({ item: favorite}) => (
                  <Swipeable
                    key={favorite.id}
                    renderRightActions={() => (
                      <RemoveButtonContainer>
                        <TouchableOpacity onPress={() => handleRemove(favorite.id)} >
                          <Ionicons name="trash" size={28} color={theme.title} />
                        </TouchableOpacity>
                      </RemoveButtonContainer>
                    )}
                  >
                    <PokeInfoContainer onPress={() => handleSelectPokemon(favorite.url)} >
                      <GradientBackground 
                        start={{x: 0, y: 1}} end={{x: 1, y: -1}}
                        colors={[ theme.background1, theme.background2 ]}
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
                            <TypeBadge key={type.slot} type={type.type} />
                          ))}       
                        </PokeTypesContainer>
                      </PokeData>                
                    </PokeInfoContainer>
                  </Swipeable>
                )}
              />
              </ListContainer>
          </Content>
        )
      }
        
    </Container>
  )
}