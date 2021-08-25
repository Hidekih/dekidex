import 'styled-components';
import { light } from '../global/styles/themes';

declare module 'styled-components' {
  type MyTheme = typeof light;
  
  export interface DefaultTheme extends MyTheme {}
}