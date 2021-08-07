import { FlatList, Image, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import { PokemonListed } from '../../utils/types';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  width: 100%;
  height: 70px;
  background: ${Colors.background[2]};
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.title};
`;

export const HeaderFilterButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: flex-end;
`;

export const Content = styled.View`
  flex: 1;
  background: ${Colors.background[2]};
`;

export const PokeListContainer = styled.View`
  position: relative;
  flex: 1;
  overflow: hidden;
`; 

export const PokeList = styled(FlatList as new () => FlatList<PokemonListed>)`
  flex: 1;
  padding: 0 16px 16px 16px;
`

export const ButtonCover = styled.View`
  margin-bottom: 8px;
  border-radius: 12px; 
  overflow: hidden;
  elevation: 4;
`;

export const PokeInfoButton = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  background: ${Colors.background[1]};
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
  transform: scale(1.1);
`;

export const PokeData = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  background: ${Colors.background[0]};
  border-radius: 12px; 
  overflow: hidden;
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
  color: ${Colors.background[2]};
`;

export const PokeNumber = styled.Text`
  font-size: 20px;
  color: ${Colors.background[2]};
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;
