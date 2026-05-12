type RgbToken =
  | '--rgb-white'
  | '--rgb-neutral-50'  | '--rgb-neutral-100' | '--rgb-neutral-200'
  | '--rgb-neutral-300' | '--rgb-neutral-400' | '--rgb-neutral-500'
  | '--rgb-neutral-600' | '--rgb-neutral-700' | '--rgb-neutral-800' | '--rgb-neutral-900'
  | '--rgb-brand-blue'  | '--rgb-brand-indigo'
  | '--rgb-success'     | '--rgb-warning'     | '--rgb-error'       | '--rgb-info';

export const cssVar = (name: RgbToken) => `rgb(var(${name}))`;
