import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  height: 56px;
  padding: 0 8px;
  background: ${({ theme }) => theme.tabBarBackground};
`;

export const IconButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 19px;
  font-weight: 700;
  color: ${({ theme }) => theme.title};
`;