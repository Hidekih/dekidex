import styled from 'styled-components/native';
import { Platform, StatusBar, Image } from 'react-native';
import Colors from '../../styles/colors';
import Layout from '../../utils/layout';
import { TypeBadgeProps } from '../../utils/types';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.black};
  /* padding-top: ${Platform.OS === 'android' ? StatusBar?.currentHeight : 0 }px; */
`; 

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 16px;
`;

export const IconButtonContainer = styled.TouchableOpacity` 
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.white};
`;

export const Content = styled.View`
  flex: 1;
  background: ${Colors.orange};
  padding: 24px 16px 16px 16px;
`;

export const RowDivider = styled.View`
  width: 100%;
  height: 2px;
  background: ${Colors.black};
`;

export const PokeDataDisplay = styled.View`
  border-radius: 8px;
  border-width: 4px;
  border-color: ${Colors.black};

  overflow: hidden;
  background: ${Colors.grayLight};
`;

export const PokedexNumber = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  color: ${Colors.black};
  text-align: center;
  text-decoration: underline;
`;

export const TextBold = styled.Text`
  font-weight: 700;
`;

export const PokemonAvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const PokeImage = styled(Image)`
  width: ${Math.floor(Layout.window.width * 0.37)}px;
  height: ${Math.floor(Layout.window.width * 0.37)}px;
`;

export const DataTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.black};
  font-weight: 700;
`;

export const DataValueContainer = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

export const DataValue = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
  font-weight: 400;
`;

export const PokemonInfoContainer = styled.View`
  background: ${Colors.white};
  padding: 0 16px;
  background: ${Colors.white};
`;

export const PokemonRowContainer = styled.View`
  height: 54px;
  flex-direction: row;
  align-items: center;
`;

export const PokemonRowWithColumnContainer = styled.View`
  width: 100%;
  height: 54px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PokemonRowColumn = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const TypeBadge = styled.View<TypeBadgeProps>`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 24px;
  border-radius: 4px;
  margin: 0 8px;
  background: ${props => Colors.type[props.typeColor] || '#000'};
`;

export const BadgeTitle = styled.Text<TypeBadgeProps>`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${Colors.white};
`;

export const SwitchController = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  margin-top: 40px;
  padding: 0 8px;

  background: ${Colors.black};
  border-radius: 8px;
  
  overflow: hidden;
`;

export const SwitchControllerText = styled.Text`
  margin: 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.grayLight};
`;
