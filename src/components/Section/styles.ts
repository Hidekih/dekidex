import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  padding: 8px 16px;
  margin-top: 16px;
  border-radius: 16px;
  elevation: 6;
  background: ${({ theme }) => theme.background2};
`;
