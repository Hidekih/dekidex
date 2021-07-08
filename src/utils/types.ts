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

export type PokemonListed = {
  id: string;
  name: string;
  url: string;
  avatar: string; 
}

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
