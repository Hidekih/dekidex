import { FlatList, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { PokemonListed } from '../../utils/types';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 106px;

  background: ${({ theme }) => theme.primary};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.shape};
`;

export const HeaderFilterButton = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: flex-end;
`;

export const Content = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.background2};
  padding: 0 20px 20px 20px;
`;

export const PokeListContainer = styled.View`
  flex: 1;
  margin-top: -50px;
  border-radius: 12px;
  overflow: hidden;
`; 

export const PokeList = styled(FlatList as new () => FlatList<PokemonListed>)`
  flex: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.background2};
`

export const PokemonButton = styled(TouchableOpacity)`
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background: transparent;
  margin-bottom: 8px;
  border-radius: 10px; 
`;

export const GradientBackground = styled(LinearGradient)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 6px; 
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
  transform: scale(1.15);
`;

export const PokemonData = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-left: -15px;
  padding: 16px 24px;
  border-radius: 8px; 
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
  color: ${({ theme }) => theme.title};
`;

export const PokemonNumber = styled.Text`
  font-weight: normal;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

export const PokemonGeneration = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;