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
  width: 100%;
  height: 56px;
  padding: 0 20px;
  
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.background[3]};

  background: ${Colors.background[2]};
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.title};
`;

export const HeaderFilterButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: flex-end;
  background: ${Colors.background[2]};
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

export const PokemonButton = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  flex-direction: row;
  border-radius: 8px; 
  margin-bottom: 10px;
  border-color: ${Colors.background[3]};
  border-width: 1px;
`;

export const PokeImage = styled(Image)`
  width: 90px;
  height: 90px;
  transform: scale(1.2);
`;

export const PokemonData = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 16px;
  background: ${Colors.background[3]};
  border-radius: 8px; 
  overflow: hidden;
`;

export const ImageContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
`;

export const PrincipalData = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const PokemonName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${Colors.title};
`;

export const PokemonNumber = styled.Text`
  font-weight: normal;
  font-size: 16px;
  color: ${Colors.subtilte};
`;

export const PokemonGeneration = styled.Text`
  font-size: 16px;
  color: ${Colors.subtilte};
`;