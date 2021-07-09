import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'Home',
            },
          },
          Favorites: {
            screens: {
              Favorites: 'Favorites',
            },
          },
        },
      },
      NotFound: '*',
      Pokemon: 'Pokemon'
    },
  },
};
