import { Image } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.background[2]};
`;

export const Header = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background: ${Colors.background[2]};
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.title};
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
  font-size: 19px;
  font-weight: 400;
  color: ${Colors.title};
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  margin-top: 24px;
  background: ${Colors.background[3]};  
  border-radius: 12px;
`;

export const ButtonTitle = styled.Text`
  margin-left: 12px;
  font-size: 19px;
  font-weight: 400;
  color: ${Colors.title};
`;

export const Content = styled.View`
  flex: 1;
  background: ${Colors.background[2]};
`;

export const PokeList = styled.ScrollView`
  flex: 1;
`; 

export const PokeInfoContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin: 0 16px 10px 16px;
  border-radius: 8px;
  z-index: 10;
  elevation: 4;
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
  width: 112px;
  height: 112px;
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

export const RemoveButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
`;