import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

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
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 20px;
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
  color: ${({ theme }) => theme.shape};
`;

export const Content = styled.View`
  position: relative;
  flex: 1;
  margin-top: -50px;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.background2};
`;

export const PokeDataDisplay = styled(ScrollView)`
  flex: 1;
`;

export const DataTitle = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.title};
  font-weight: 700;
  align-items: center;
`;

export const DataValueContainer = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

  export const RowContent = styled.View`
    height: 54px;
    flex-direction: row;
    align-items: center;
  `;
