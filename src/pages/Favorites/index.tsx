import React, { useEffect, useState } from 'react';
import Colors from '../../styles/colors';
import { FavoritedPokemon } from '../../utils/types';
import { load } from '../../storage/favorites';

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

} from './styles';
import { useNavigation } from '@react-navigation/native';

export function Favorites() {
  const [ favorites, setFavorites ] = useState<FavoritedPokemon[]>([]);
  const { addListener, removeListener } = useNavigation();

  useEffect(() => {
    const navigationFocusListener = addListener('focus', () => {
      fetchFavorites();
    });
    
    return () => {
      removeListener('focus', navigationFocusListener);
    };
  }, []);

  async function fetchFavorites(): Promise<void> {
    const data = await load();
    setFavorites(data);
  }
  
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
              <PokeInfoContainer key={favorite.id}>
                <GradientBackground 
                  colors={[ Colors.type[favorite.types[0].type || 'dark'], Colors.background[9]]}
                />
                <PokeImage 
                  height={100} 
                  width={100} 
                  source={{ uri: favorite.avatar || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png` }}
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
            ))}
          </PokeList>
        
      </Content>
    </Container>
  )
}