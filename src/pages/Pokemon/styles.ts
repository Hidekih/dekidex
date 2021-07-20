import styled from 'styled-components/native';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../styles/colors';
import Layout from '../../utils/layout';
import { TypeBadgeProps } from '../../utils/types';

type SelectedProps = {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${Colors.background[2]};
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
  color: ${Colors.title};
`;

export const Content = styled.View`
  position: relative;
  flex: 1;
  background: ${Colors.background[2]};
  padding: 8px 16px 16px 16px;
`;

export const PokeDataDisplay = styled.View`
  flex: 1;
  /* background: ${Colors.background[1]}; */
  /* border-radius: 12px; */
  overflow: hidden;
`;

export const PokemonSpriteControllers = styled.View<TypeBadgeProps>`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: flex-end;
  padding: 8px 8px 0 8px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: ${props => props.typeColor};
`;

export const SpriteColorController = styled.View`
  flex-direction: row;
  height: 100%;
  flex: 1;
  background: ${Colors.background[3]};
  border-radius: 12px;
`;

export const SpriteGenderController = styled.View`
  flex-direction: row;
  height: 100%;
  margin-left: 16px;
  width: 112px;
  background: ${Colors.background[3]};
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
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
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

export const Section = styled.View`
  position: relative;
  padding: 8px 16px;
  margin-bottom: 16px;

  background: ${Colors.background[3]};
  border-radius: 12px;

  overflow: hidden;
`;

export const RowContainer = styled.View`
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
  justify-content: center;
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
  margin-top: 16px;
  background: ${Colors.background[3]};
  border-radius: 8px;
  
  overflow: hidden;
`;

export const GameVersionsList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 6px 0 16px 0;
`;

export const GameVersionButton = styled.TouchableOpacity<SelectedProps>`
  align-items: center;
  justify-content: center;
  height: 34px;
  margin-top: 12px;
  margin-right: 8px;
  padding: 0 8px; 
  background: ${props => props.isSelected ? Colors.title : 'transparent'};
  border-width: 1px;
  border-style: solid;
  border-color: ${Colors.subtilte};
  border-radius: 8px;
`;

export const GameVersionTitle = styled.Text<SelectedProps>`
  font-size: 18px;
  font-weight: ${props => props.isSelected ? '700' : '400'};
  color: ${props => props.isSelected ? Colors.background[2] : Colors.subtilte};
`;


export const MoveRowContainer = styled.View`
  height: 54px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${Colors.subtilte};
  border-bottom-width: 1px;
`;
