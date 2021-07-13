const BASE_FORMAT = '000';

export function generatePokedexNumber(value: string) {
  const valueLength = value.length;
  const baseFormatLength = BASE_FORMAT.length;
  
  const formatedValue = BASE_FORMAT.substring(0, baseFormatLength - valueLength) + value;
  
  return formatedValue;
}

