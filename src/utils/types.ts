export type PokemonData = {
  id: string;
  pokedexNumber: string;
  ability: string;
  name: string;
  is_unique_gender: boolean;
  sprites: {
    versions: {
      default: {
        back_default: string;
        back_female?: string | null;
        back_shiny: string;
        back_shiny_female?: string | null;
        front_default: string;
        front_female?: string | null;
        front_shiny: string;
        front_shiny_female?: string | null;
      }
      // "generation-i": {
      //   "red-blue": {
      //     back_default: string | null;
      //     front_default: string | null;
      //   }
      // },
      // "generation-ii": {},
      // "generation-iii": {},
      // "generation-iv": {},
      // "generation-v": {},
      // "generation-vi": {},
      // "generation-vii": {},
      // "generation-viii": {},
    }
  },
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

export type CurrentSprites = {
  normal: {
    female: {
      front: string | null | undefined;
      back: string | null | undefined;
    },
    male: {
      front: string;
      back: string;
    },
  },
  shiny: {
    female: {
      front: string | null | undefined;
      back: string | null | undefined;
    },
    male: {
      front: string | null | undefined;
      back: string | null | undefined;
    }
  }
};

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