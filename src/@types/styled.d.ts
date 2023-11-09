import 'styled-components';
import { theme } from '../styles/theme';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}

declare module '*.otf';

declare interface Paginated<T> {
  page: number;
  data: T;
  totalCount: number;
  limit: number;
}

declare type Translator = Record<string, string>;
