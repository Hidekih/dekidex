import { FlatList, Platform, StatusBar, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { PokemonListed } from '../../utils/types';

export const Container = styled.View`
  flex: 1;
  /* padding-top: ${Platform.OS === 'android' ? StatusBar?.currentHeight : 0 }px; */
`;

export const Header = styled.View`
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: center;
  background: ${Colors.black};
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.white};
`;

export const Content = styled.View`
  flex: 1;
  background: ${Colors.orange};
  padding: 24px 16px 16px 16px;
`;

export const PokeListContainer = styled.View`
  flex: 1;
  border-radius: 12px;
  border-width: 4px;
  border-color: ${Colors.black};
  overflow: hidden;
  margin-top: -24px;
`; 

export const PokeList = styled(FlatList as new () => FlatList<PokemonListed>)`
  flex: 1;
  background-color: ${Colors.gray};
`

export const ButtonCover = styled.View`
  border-radius: 12px; 
  overflow: hidden;
  margin-bottom: 4px;
`;

export const PokeInfoButton = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  background: ${Colors.grayLight};
  border-bottom-color: ${Colors.black};
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
  background: ${Colors.grayLight};
`;

export const PokeData = styled.View`
border-radius: 12px; background: ${Colors.white};
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
  color: ${Colors.black};
`;

export const PokeNumber = styled.Text`
  font-size: 20px;
  color: ${Colors.black};
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;
