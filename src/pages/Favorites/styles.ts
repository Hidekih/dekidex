import { FlatList, Platform, StatusBar, Image } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';
// import { Pokemon } from '../../utils/types';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? StatusBar?.currentHeight : 0 }px;
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
  border-radius: 8px;
  border-width: 4px;
  border-color: ${Colors.black};
  overflow: hidden;
`; 

// export const PokeList = styled(FlatList as new () => FlatList<Pokemon>)`
export const PokeList = styled(FlatList as new () => FlatList)`
  flex: 1;
  background-color: ${Colors.gray};
`;

export const PokeInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  background: ${Colors.white};
  border-bottom-color: ${Colors.black};

  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 4px;
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
  background: ${Colors.grayLight};
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

export const PokeTypesContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

type TypeBadgeProps = {
  typeColor: string;
}

export const TypeBadge = styled.View<TypeBadgeProps>`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 24px;
  border-radius: 4px;
  margin: 0 8px;
  background: ${props => Colors.type[props.typeColor] };
`;

export const BadgeTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.white};
`;
