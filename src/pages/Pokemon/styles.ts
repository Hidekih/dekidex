import styled from 'styled-components/native';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../styles/colors';
import Layout from '../../utils/layout';
import { TypeBadgeProps } from '../../utils/types';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.background[9]};
`; 

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 16px;
`;

export const IconButtonContainer = styled.TouchableOpacity`   
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.title};
`;

export const Content = styled.View`
  flex: 1;
  background: ${Colors.background[9]};
  padding: 8px 16px 16px 16px;
`;

export const RowDivider = styled.View`
  width: 100%;
  height: 2px;
  background: ${Colors.background[9]};
`;

export const PokeDataDisplay = styled.View`
  background: ${Colors.background[5]};
  border-radius: 12px;
  overflow: hidden;
`;

export const PokemonSpriteControllers = styled.View<TypeBadgeProps>`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  padding: 8px 8px 0 8px;
  background: ${props => props.typeColor};
`;

export const SpriteColorController = styled.View`
  flex-direction: row;
  height: 44px;
  flex: 1;
  background: ${Colors.background[9]};
  border-radius: 12px;
`;

export const SpriteGenderController = styled.View`
  flex-direction: row;
  height: 44px;
  margin-left: 16px;
  width: 112px;
  background: ${Colors.background[9]};
  border-radius: 12px;
`;

export const ChangeSpriteGenderButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`;  

export const PokemonAvatarContainer = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-around;
`;

export const GradientBackground = styled(LinearGradient)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const PokeImage = styled(Image)`
  width: ${Math.floor(Layout.window.width * 0.40)}px;
  height: ${Math.floor(Layout.window.width * 0.40)}px;
`;

export const DataTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.title};
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
  color: ${Colors.subtilte};
  font-weight: 400;
`;

export const PokemonInfoContainer = styled.View`
  background: ${Colors.background[5]};
  padding: 0 16px;
`;

export const PokemonRowContainer = styled.View`
  height: 60px;
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
  border-radius: 8px;
  margin: 0 8px;
  background: ${props => Colors.type[props.typeColor] || '#000'};
`;

export const BadgeTitle = styled.Text<TypeBadgeProps>`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${Colors.title};
`;

export const SwitchController = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  margin-top: 40px;
  background: ${Colors.background[5]};
  border-radius: 8px;
  
  overflow: hidden;
`;
