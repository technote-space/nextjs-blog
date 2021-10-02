import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import Box from './Box';

export default {
  title: 'Common Components/Box',
  component: Box,
  argTypes: {
    children: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello World!',
};
