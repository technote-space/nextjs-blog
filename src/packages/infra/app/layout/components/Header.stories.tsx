import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import Header from './Header';

export default {
  title: 'Layout Components/Header',
  component: Header,
  argTypes: {
    title: { control: { type: 'text' } },
    pages: { control: { type: 'array' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Hello World!',
  pages: [
    { label: 'お問い合わせ', url: 'https://example.com' },
    { label: '利用規約', url: 'https://example.com' },
  ],
};

export const Long = Template.bind({});
Long.args = {
  title: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ',
  pages: [
    { label: 'お問い合わせ', url: 'https://example.com' },
    { label: '利用規約', url: 'https://example.com' },
  ],
};

export const NoPages = Template.bind({});
NoPages.args = {
  title: 'Hello World!',
};
