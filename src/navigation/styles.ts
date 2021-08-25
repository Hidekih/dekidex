import styled from 'styled-components/native';

export const TabContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${({ theme }) => theme.tabBarBackground};
`;

export const TabTitle = styled.Text`
  margin-left: 12px;
  font-weight: 700;
  font-size: 16px;
`;