import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              TabOneScreen: 'home',
            },
          },
          Favorites: {
            screens: {
              TabTwoScreen: 'favorites',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
