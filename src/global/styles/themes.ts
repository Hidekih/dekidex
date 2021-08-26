type ThemeProps = {
  primary: string;
	background1: string;
	background2: string;
	title: string;
	text: string;
	tabBarBackground: string;
  inactivity: string;
  shape: string;
  type: {
    [key: string]: string;
  }
} 

const typeColorsLight = {
  "bug": 'rgba(173, 189, 33, 1)',
  "dark": 'rgba(115, 90, 74, 1)',
  "dragon": 'rgba(123, 99, 231, 1)',
  "electric": 'rgba(255, 198, 49, 1)',
  "fairy": 'rgba(229, 132, 234, 1)',
  "fighting": 'rgba(165, 82, 57, 1)',
  "fire": 'rgba(247, 82, 49, 1)',
  "flying": 'rgba(156, 173, 247, 1)',
  "ghost": 'rgba(99, 99, 181, 1)',
  "grass": 'rgba(123, 206, 82, 1)',
  "ground": 'rgba(165, 132, 58, 1)',
  "ice": 'rgba(90, 206, 231, 1)',
  "normal": 'rgba(171, 163, 146, 1)',
  "poison": 'rgba(181, 90, 165, 1)',
  "psychic": 'rgba(255, 115, 165, 1)',
  "rock": 'rgba(189, 165, 90, 1)',
  "steel": 'rgba(173, 173, 198, 1)',
  "water": 'rgba(57, 156, 255, 1)',
}

const typeColorsDark = {
  "bug": '#9CAA1D',
  "dark": '#675142',
  "dragon": '#6E59D0',
  "electric": '#E6B22C',
  "fairy": '#CE77D3',
  "fighting": '#944933',
  "fire": '#DE492C',
  "flying": '#8C9CDE',
  "ghost": '#5959A3',
  "grass": '#6EB949',
  "ground": '#947734',
  "ice": '#51B9D0',
  "normal": '#9A9383',
  "poison": '#A35194',
  "psychic": '#E66794',
  "rock": '#AA9451',
  "steel": '#9C9CB2',
  "water": '#338CE6',
}

export const light = {
  primary: '#DC092D',
  background1: '#CBCBCB',
  background2: '#f9f9f9',
  title: '#383635',
  text: '#555252',
  tabBarBackground: '#383635',
  inactivity: '#7A7776',
  shape: '#f9f9f9',
  type: typeColorsLight,
} as ThemeProps

export const dark = {
	primary: '#C50828',
	background1: '#555252',
	background2: '#383635',
	title: '#f9f9f9',
	text: '#E4E4E4',
	tabBarBackground: '#222222',
  inactivity: '#7A7776',
  shape: '#f9f9f9',
	type: typeColorsDark,
} as ThemeProps
