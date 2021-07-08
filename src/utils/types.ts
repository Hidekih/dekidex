export type PokemonData = {
  name: string;
  sprites: {
    back_default: string;
    front_default: string;
  }
  types: [
    {
      slot: number;
      type: string;
    }
  ];
  height: number;
  weight: number;
}

export type ThemesColor = {
  orange: string;
  black: string;
  grayLight: string;
  gray: string;
  white: string;
  type: {
    [key: string]: string;
  };
}

// export type pokemonTypeColors = {
//   bug: string;
//   dark: string;
//   dragon: string;
//   eletric: string;
//   fairy: string;
//   fight: string;
//   fire: string;
//   flying: string;
//   ghost: string;
//   grass: string;
//   ground: string;
//   ice: string;
//   normal: string;
//   poison: string;
//   psychc: string;
//   rock: string;
//   steel: string;
//   water: string;
// }

export type PokemonListed = {
  id: string;
  name: string;
  url: string;
  avatar: string; 
}

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Pokemon: undefined;
};
