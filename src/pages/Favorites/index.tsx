import React from 'react';
import { SafeAreaView } from 'react-native';
import Themes from '../../styles/colors';

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
              data={[ 1 ]} 
              renderItem={( { item: pokemon } ) => (
                // <PokeInfoContainer key={pokemon}>
                //   <PokeImage 
                //     height={100} 
                //     width={100} 
                //     source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png` }}
                //   />
                //   <PokeData>
                //     <PokeBasicsContainer>    
                //       <PokeName>
                //         {pokemon === 251 ? 'Celebi' : 'Flygon' }
                //       </PokeName>
                //       <PokeNumber>
                //         {'#'}
                //         <BoldText>{pokemon}</BoldText>
                //       </PokeNumber>
                //     </PokeBasicsContainer>
                //     <PokeTypesContainer>
                //       { true && ['grass','poison'].map(type => (
                //         <TypeBadge key={type} typeColor={'grass'}>
                //           <BadgeTitle>
                //             {'Sla'}
                //           </BadgeTitle>
                //         </TypeBadge>
                //       )) }
                //     </PokeTypesContainer>
                //   </PokeData>                
                // </PokeInfoContainer>



                <> 
                  <PokeInfoContainer>
                    <PokeImage 
                      height={100} 
                      width={100} 
                      source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png` }}
                    />
                    <PokeData>
                      <PokeBasicsContainer>    
                        <PokeName>
                          {'Celebi' }
                        </PokeName>
                        <PokeNumber>
                          {'#'}
                          <BoldText>{'251'}</BoldText>
                        </PokeNumber>
                      </PokeBasicsContainer>
                      <PokeTypesContainer>
                        
                          <TypeBadge typeColor={'psychc'}>
                            <BadgeTitle>
                              {'Psychc'}
                            </BadgeTitle>
                          </TypeBadge>
                          <TypeBadge typeColor={'grass'}>
                            <BadgeTitle>
                              {'Grass'}
                            </BadgeTitle>
                          </TypeBadge>
                        
                      </PokeTypesContainer>
                    </PokeData>                
                  </PokeInfoContainer>

                  <PokeInfoContainer>
                    <PokeImage 
                      height={100} 
                      width={100} 
                      source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png` }}
                    />
                    <PokeData>
                      <PokeBasicsContainer>    
                        <PokeName>
                          {'Flygon'}
                        </PokeName>
                        <PokeNumber>
                          {'#'}
                          <BoldText>{'330'}</BoldText>
                        </PokeNumber>
                      </PokeBasicsContainer>
                      <PokeTypesContainer>
                        
                          <TypeBadge typeColor={'ground'}>
                            <BadgeTitle>
                              {'Ground'}
                            </BadgeTitle>
                          </TypeBadge>
                          <TypeBadge typeColor={'dragon'}>
                            <BadgeTitle>
                              {'Dragon'}
                            </BadgeTitle>
                          </TypeBadge>
                        
                      </PokeTypesContainer>
                    </PokeData>                
                  </PokeInfoContainer>
                </>


              )}
            />
          </PokeListContainer> 
        </Content>
      </Container>
    </SafeAreaView>
  )
}