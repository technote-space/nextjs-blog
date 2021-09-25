import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import Header from './Header';

export default {
  title: 'Layout Components/Header',
  component: Header,
  argTypes: {
    title: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Hello World!',
};
