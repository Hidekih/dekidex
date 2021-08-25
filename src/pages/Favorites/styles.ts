import { Image, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FavoritedPokemon } from '../../utils/types';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.background2};
`;

export const Header = styled.View`
  width: 100%;
  height: 106px;

  background: ${({ theme }) => theme.primary};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  padding: 0 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.shape};
`;

export const EmpytContent = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MessageBox = styled.View`
  width: 60%;
`;

export const Description = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.title};
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  margin-top: 24px;
  border-radius: 8px;
`;

export const ButtonTitle = styled.Text`
  margin-left: 12px;
  font-size: 19px;
  font-weight: 400;
  color: ${({ theme }) => theme.title};
`;

export const Content = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.background2};
  padding: 0 20px 20px 20px;
`;

export const ListContainer = styled.View`
  flex: 1;
  margin-top: -50px;
  border-radius: 16px;
  overflow: hidden;
`;

export const PokeList = styled(FlatList as new () => FlatList<FavoritedPokemon>)`
  background: ${({ theme }) => theme.background2};
  flex: 1;
`; 

export const PokeInfoContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 8px;
  border-radius: 12px;
  z-index: 10;
`;

export const GradientBackground = styled(LinearGradient)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 8px;
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-left: 8px;
  transform: scale(1.2);
`;

export const PokeData = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 16px;
  padding-bottom: 16px;
`;

export const PokeBasicsContainer = styled.View`
  flex-direction: row;
  justify-content:space-between;
`;

export const PokeName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

export const PokeNumber = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const PokeTypesContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const RemoveButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: ${({ theme }) => theme.background1};
`;