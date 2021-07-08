export function captalize(text: string) {
  const firstChar = text.charAt(0).toUpperCase();
  const textRest = text.substring(1).toLowerCase();

  return firstChar + textRest;
}