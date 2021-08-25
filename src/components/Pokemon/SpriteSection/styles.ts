import styled from 'styled-components/native';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../../../utils/layout';

type Colors = {
  primary: string;
  secondary: string;
};

export const Container = styled.View<Colors>`
  elevation: 5;
  background: ${({ theme }) => theme.background2};
  border-radius: 16px;
  overflow: hidden;
  border-width: 4px;
  border-top-color: ${({ primary }) => primary};
  border-right-color: ${({ primary }) => primary};
  border-bottom-color: ${({ secondary }) => secondary};
  border-left-color: ${({ secondary }) => secondary};
`

export const HeaderButtons = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: flex-end;
  padding: 8px 16px 0 16px;
`;

export const SpriteColorSection = styled.View`
  flex: 1;
  flex-direction: row;
  height: 100%;
  background: ${({ theme }) => theme.tabBarBackground};
  border-radius: 12px;
`;

export const SpriteGenderSection = styled.View`
  flex-direction: row;
  height: 100%;
  margin-left: 16px;
  width: 112px;
  background: ${({ theme }) => theme.tabBarBackground};
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

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
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