export type Stat = {
  base_stat: number;
  effort: number;
  name: string;
}

export type MoveGen = {
  name: string;
  level_learned_at: number;
  learn_method: string;
}

export type GameVersions = 
  "red-blue"
| "yellow"
| "gold-silver"
| "crystal"
| "ruby-sapphire"
| "emerald"
| "firered-leafgreen"
| "diamond-pearl"
| "platinum"
| "heartgold-soulsilver"
| "black-white"
| "colosseum"
| "xd"
| "black-2-white-2"
| "x-y"
| "omega-ruby-alpha-sapphire"
| "sun-moon"
| "ultra-sun-ultra-moon"
| "lets-go"
| "sword-shield";

export type MovesByGen = {
  [key: string]: MoveGen[];
}

export type MoveVersionDetails = {
  level_learned_at: number;
  move_learn_method: {
    name: string;
  },
  version_group: {
    name: GameVersions;
  }   
  /* Example(JSON): 
  "level_learned_at": 0,
    "move_learn_method": {
      "name": "egg"
    },
    "version_group": {
      "name": "gold-silver"
    }
  */
}

export type Moves = {
  move: {
    name: string;
  },
  version_group_details: [
    {
      level_learned_at: number;
      move_learn_method: {
        name: string;
      },
      version_group: {
        name: GameVersions;
      }  
    }
  ];
}

export type PokemonData = {
  id: string;
  ability: string;
            pokedexNumber: string;
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
  stats: [
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat
  ],
  moves: Moves[];
  base_experience: number;
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
    "1": string;
    "2": string;
    "3": string;
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