import {makeTheme} from 'dripsy';

import colors from './colors';
import spacing from './spacing';
import radius from './radius';
import buttons from './buttons';
import text from './text';

export const theme = makeTheme({
  colors,
  space: spacing,
  radii: radius,
  buttons,
  text,
});

type MyTheme = typeof theme;
declare module 'dripsy' {
  interface DripsyCustomTheme extends MyTheme {}
}
