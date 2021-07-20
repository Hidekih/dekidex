import styled from 'styled-components/native';

type ContainerProps = {
  size: 'small' | 'medium' | 'large';
  bgColor: string;
}

const boxSize = {
  'small': { height: '50px', width: '150px'},
  'medium': { height: '100px', width: '250px'},
  'large': { height: '200px', width: '350px'},
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  justify-content: center;
  width: ${props => boxSize[props.size].width};
  height: ${props => boxSize[props.size].height};
  margin-bottom: 16px;

  background: ${props => props.bgColor || '#333'};
  border-radius: 12px;
`;