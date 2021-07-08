import React from 'react';
import { SafeAreaView } from 'react-native';
import Themes from '../../styles/themes';

import { 
  Container, 
  Header, 
  HeaderTitle, 
  Content, 
  PokeListContainer,
  PokeList,
  
  PokeInfoContainer,
  PokeImage,
  PokeData,
  PokeBasicsContainer,
  PokeName,
  PokeNumber,
  BoldText,
  PokeTypesContainer,
  TypeBadge,
  BadgeTitle
} from './styles';

export function Favorites() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <HeaderTitle>Favorites</HeaderTitle>
        </Header>
        
        <Content>
          <PokeListContainer>
            <PokeList
              data={[ 1, 2 ]} 
              renderItem={( { item: pokemon } ) => (
                <PokeInfoContainer key={pokemon}>
                  <PokeImage 
                    height={100} 
                    width={100} 
                    source={{ uri:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' }}
                  />
                  <PokeData>
                    <PokeBasicsContainer>    
                      <PokeName>
                        {'Bulbasaur'}
                      </PokeName>
                      <PokeNumber>
                        {'#'}
                        <BoldText>{'001'}</BoldText>
                      </PokeNumber>
                    </PokeBasicsContainer>
                    <PokeTypesContainer>
                      { true && ['grass','poison'].map(type => (
                        <TypeBadge key={type} color={'grass'}>
                          <BadgeTitle>
                            {'Sla'}
                          </BadgeTitle>
                        </TypeBadge>
                      )) }
                    </PokeTypesContainer>
                  </PokeData>                
                </PokeInfoContainer>
              )}
            />
          </PokeListContainer> 
        </Content>
      </Container>
    </SafeAreaView>
  )
}