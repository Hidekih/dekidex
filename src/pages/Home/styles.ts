import { FlatList, Platform, StatusBar, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Themes from '../../styles/themes';
import { PokemonListed } from '../../utils/types';

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

export const PokeList = styled(FlatList as new () => FlatList<PokemonListed>)`
  flex: 1;
  background-color: ${Themes.gray};
`

export const PokeInfoContainer = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  background: ${Themes.white};
  border-bottom-color: ${Themes.black};

  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 4px;
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
  background: ${Themes.grayLight};
`;

export const PokeData = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  padding-bottom: 16px;
`;

export const ImageContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
`;

export const PokeBasics = styled.View`
  justify-content: space-between;
`;

export const PokeName = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${Themes.black};
`;

export const PokeNumber = styled.Text`
  font-size: 20px;
  color: ${Themes.black};
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;
