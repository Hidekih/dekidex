import { Platform, StatusBar, Image } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.background[9]};
  /* padding-top: ${Platform.OS === 'android' ? StatusBar?.currentHeight : 0 }px; */
`;

export const Header = styled.View`
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: center;
  background: ${Colors.background[9]};
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.title};
`;

export const Content = styled.View`
  flex: 1;
  background: ${Colors.background[9]};
  padding: 24px 16px 16px 16px;
`;

export const PokeList = styled.ScrollView`
  flex: 1;
  border-radius: 8px;
  border-width: 4px;
  border-color: ${Colors.background[9]};
  overflow: hidden;
`; 

// export const PokeList = styled(FlatList as new () => FlatList<Pokemon>)`
// export const PokeList = styled.ScrollView`
//   flex: 1;
//   background-color: ${Colors.gray};
// `;

export const PokeInfoContainer = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 4px;

  overflow: hidden;
`;

export const GradientBackground = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const PokeImage = styled(Image)`
  width: 100px;
  height: 100px;
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
  color: ${Colors.subtilte};
`;

export const PokeNumber = styled.Text`
  font-size: 20px;
  color: ${Colors.subtilte};
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
  margin: 0 12px;
  background: ${props => Colors.type[props.typeColor] || '#000'};
`;

export const BadgeTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.title};
`;
