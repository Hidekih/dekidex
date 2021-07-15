import { Image } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../styles/colors';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.background[9]};
`;

export const Header = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background: ${Colors.background[9]};
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.title};
`;

export const Content = styled.View`
  flex: 1;
  background: ${Colors.background[9]};
`;

export const PokeList = styled.ScrollView`
  flex: 1;
`; 

export const PokeInfoContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin: 8px 16px 8px 16px;
  border-radius: 8px;
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
  transform: scale(1.4);
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

export const RemoveButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
`;