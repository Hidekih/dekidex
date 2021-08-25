import styled from 'styled-components/native';

export const Container = styled.View`
  height: 54px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  color: ${({ theme }) => theme.title};
  font-weight: 700;
  text-align: center;
`;
