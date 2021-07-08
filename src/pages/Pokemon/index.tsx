import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

import pokeballImg from '../../assets/pokeball-icon.png';
import { RectButton } from 'react-native-gesture-handler';

import { Container } from './styles';

type RoutePrams = {
  url: string;
}

export function Pokemon() {
  const route = useRoute();
  const { url } = route.params as RoutePrams;
  const [ pokemon, setPokemon ] = useState({});
  const [ isFetching, setIsFetching ] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios.get(url)
      .then(response => {
        console.log(response.data)
        setPokemon(response.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  

  if(isFetching) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    )
  }

  return (
    <Container>
      <Text>{pokemon?.name}</Text>
    </Container>
  )
}