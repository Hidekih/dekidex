import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { captalize } from '../utils/captalize';
import { FavoritedPokemon, PokemonData } from '../utils/types';

export async function load(): Promise<FavoritedPokemon[]> {
  try {
    const response = await AsyncStorage.getItem('@pokedex:favorites');
    const favorites = response ? JSON.parse(response) as FavoritedPokemon[] : [];

    return favorites;
  } catch {
    Alert.alert('Não foi possível carregar seus favoritos :(');
  }

  return [];
}

export async function save(data: PokemonData): Promise<void> {
  try {
    const response = await AsyncStorage.getItem('@pokedex:favorites');
    const favorites = response ? JSON.parse(response) as FavoritedPokemon[] : [];

    const pokemon = {
      id: data.id,
      name: data.name,
      avatar: data.sprites.front_default,
      pokedex_Number: data.pokedexNumber,
      types: data.types.map(type => {
        return {
          slot: type.slot,
          name: captalize(type.type),
          type: type.type,
        }
      }),
      url: data.url,
    } as FavoritedPokemon;

    await AsyncStorage.setItem('@pokedex:favorites', JSON.stringify([
      ...favorites,
      pokemon,
    ]));
  } catch {
    Alert.alert('Não foi possível favoritar esse pokemon :(');
  }
}

export async function findOne(id: string): Promise<FavoritedPokemon | undefined> {
  try {
    const response = await AsyncStorage.getItem('@pokedex:favorites');
    const favorites = response ? JSON.parse(response) as FavoritedPokemon[] : [];

    const pokemon = favorites.find(fav => fav.id === id);

    return pokemon;
  } catch {
    Alert.alert('Não foi possível achar esse pokemon :(');
  }
}

export async function remove(id: string): Promise<FavoritedPokemon[] | undefined> {
  try {
    const data = await AsyncStorage.getItem('@pokedex:favorites');
    const favorites = data ? JSON.parse(data) as FavoritedPokemon[] : [];

    const updatedFavorites = favorites.filter(fav => fav.id !== id);

    await AsyncStorage.setItem('@pokedex:favorites', JSON.stringify(updatedFavorites));

    return updatedFavorites;
  } catch {
    Alert.alert('Não foi possível deletar esse pokemon da sua lista de favoritos :(');
  }
}
