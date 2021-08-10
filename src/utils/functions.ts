import { data as genData } from './data.json';
import { MoveGen } from "./types";

const BASE_FORMAT = '000';

export function getGen(id: number): string {
  const gen = genData.find(data => {
    if (id >= data.initial && id <= data.last)
      return data;
  });

  if (!gen) {
    return '';
  }

  return gen.name;
}

export function createAvatarLink(id: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
} 

export function createPokemonUrl(id: number) {
  return `https://pokeapi.co/api/v2/pokemon/${id}`;
}

export function generatePokedexNumber(value: string) {
  const valueLength = value.length;
  const baseFormatLength = BASE_FORMAT.length;
  
  const formatedValue = BASE_FORMAT.substring(0, baseFormatLength - valueLength) + value;
  
  return formatedValue;
}

export function captalize(text: string) {
  const firstChar = text.charAt(0).toUpperCase();
  const textRest = text.substring(1).toLowerCase();

  return firstChar + textRest;
}

export function compareLevel( a: MoveGen, b: MoveGen ) {
  if ( a.level_learned_at < b.level_learned_at ){
    return -1;
  }
  if ( a.level_learned_at > b.level_learned_at ){
    return 1;
  }
  return 0;
}