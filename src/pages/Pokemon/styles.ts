import styled from 'styled-components/native';

import Colors from '../../styles/colors';

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
`;

export const PokeDataDisplay = styled.View`
  flex: 1;
  overflow: hidden;
`;



export const DataTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.title};
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
