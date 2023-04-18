import React, {PropsWithChildren} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {DripsyProvider} from 'dripsy';
import {theme} from '../../src/styles/theme';

const AllTheProviders: React.FC<PropsWithChildren> = ({children}) => {
  return <DripsyProvider theme={theme}>{children}</DripsyProvider>;
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
