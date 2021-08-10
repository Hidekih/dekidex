import styled from 'styled-components/native';
import { SkeletonContentProps } from './index';

type Props = Omit<SkeletonContentProps, 'indicatorColor'>;

export const Container = styled.View<Props>`
  align-items: center;
  justify-content: center;
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  margin-top: ${({ mt }) => mt}px;
  
  background: ${props => props.bgColor};
  border-radius: 8px;
`;