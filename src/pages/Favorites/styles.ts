import { FlatList, Platform, StatusBar, Image } from 'react-native';
import styled from 'styled-components/native';
import Themes from '../../styles/themes';
import { Pokemon } from '../../utils/types';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? StatusBar?.currentHeight : 0 }px;
`;

export const Header = styled.View`
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: center;
  background: ${Themes.black};
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Themes.white};
`;

export const Content = styled.View`
  flex: 1;
  background: ${Themes.orange};
  padding: 16px;
`;

export const PokeListContainer = styled.View`
  flex: 1;
  border-radius: 8px;
  border-width: 4px;
  border-color: ${Themes.black};
  overflow: hidden;
`; 

// export const PokeList = styled(FlatList as new () => FlatList<Pokemon>)`
export const PokeList = styled(FlatList as new () => FlatList)`
  flex: 1;
  background-color: ${Themes.gray};
`;

export const PokeInfoContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 8px;
  flex-direction: row;
  overflow: hidden;
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
  background: ${Themes.grayLight};
`;

export const PokeData = styled.View`
  background: ${Themes.white};
`;

export const PokeBasicsContainer = styled.View`

`;

export const PokeName = styled.Text`

`;

export const PokeNumber = styled.Text`

`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const PokeTypesContainer = styled.View`

`;

type TypeBadgeProps = {
  color: string;
}

export const TypeBadge = styled.View<TypeBadgeProps>`

`;

export const BadgeTitle = styled.Text`

`;
