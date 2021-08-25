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

const typeColors = {
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

export const dark = {
	primary: '#C50828',
	background1: '#555252',
	background2: '#383635',
	title: '#f9f9f9',
	text: '#E4E4E4',
	tabBarBackground: '#555252',
  inactivity: '#7A7776',
  shape: '#f9f9f9',
	type: typeColors,
} as ThemeProps

export const light = {
  primary: '#DC092D',
	background1: '#CBCBCB',
	background2: '#f9f9f9',
	title: '#383635',
	text: '#555252',
	tabBarBackground: '#383635',
  inactivity: '#7A7776',
  shape: '#f9f9f9',
  type: typeColors,
} as ThemeProps
