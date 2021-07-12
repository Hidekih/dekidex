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
}

export type FavoritedPokemon = {
  id: string;
  url: string;
  name: string;
  types: [
    {
      slot: string;
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