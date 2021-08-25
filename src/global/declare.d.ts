import 'styled-components';
import { light as Theme } from '../';

declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {}
}