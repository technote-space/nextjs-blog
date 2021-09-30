import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import Layout from './Layout';

export default {
  title: 'Layout Components/Layout',
  component: Layout,
  argTypes: {
    head: { control: { type: 'text' } },
    header: { control: { type: 'text' } },
    footer: { control: { type: 'text' } },
    children: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  head: '[[head]]',
  header: '[[header]]',
  footer: '[[footer]]',
  children: 'Hello World!',
};
