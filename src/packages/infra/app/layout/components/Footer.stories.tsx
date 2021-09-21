import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import Footer from './Footer';

export default {
  title: 'Layout Components/Footer',
  component: Footer,
  argTypes: {
    author: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  author: 'Hello World!',
};
