export type PokemonData = {
  id: string;
  pokedexNumber: string;
  ability: string;
  name: string;
  back_default: string;
  front_default: string;
  types: [
    {
      slot: string;
      type: string;
    }
  ];
  height: number;
  weight: number;
  url: string;
}

export type FavoritedPokemon = {
  id: string;
  name: string;
  avatar: string;
  pokedex_Number: string;
  url: string;
  types: [
    {
      slot: string;
      name: string;
      type: string;
    }
  ];
}

export type ThemesColor = {
  background: {
    "0": string;
    "5": string;
    "9": string;
  }
  title: string;
  subtilte: string;
  type: {
    [key: string]: string;
  };
}

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

export type TypeBadgeProps = {
  typeColor: string;
}