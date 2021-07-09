import styled from 'styled-components/native';
import { Platform, StatusBar, Image } from 'react-native';
import Colors from '../../styles/colors';
import Layout from '../../utils/layout';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.black};

  padding-top: ${Platform.OS === 'android' ? StatusBar?.currentHeight : 0 }px;
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

export const PokeDataDisplay = styled.View`
  border-radius: 8px;
  border-width: 4px;
  border-color: ${Colors.black};

  overflow: hidden;
  background: ${Colors.white};
`;

export const PokedexNumber = styled.Text`
margin-top: 8px;
  font-size: 18px;
  color: ${Colors.black};
  text-align: center;
`;

export const TextBold = styled.Text`
  font-weight: 700;
`;

export const PokeAvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  /* background: ${Colors.grayLight}; */
`;

export const PokeImage = styled(Image)`
  /* flex: 1; */
  width: ${Math.floor(Layout.window.width * 0.37)}px;
  height: ${Math.floor(Layout.window.width * 0.37)}px;
`;