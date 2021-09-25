import 'reflect-metadata';
import '^/config/registry.theme';
import { container } from 'tsyringe';
import { withPerformance } from 'storybook-addon-performance';
import { Story } from '@storybook/react';
import type { ITheme } from '$/domain/app/theme';

const withChakra = (Story: Story) => {
  return (container.resolve('ITheme') as ITheme).render({}, <Story/>);
};
export const decorators = [withChakra, withPerformance]
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
