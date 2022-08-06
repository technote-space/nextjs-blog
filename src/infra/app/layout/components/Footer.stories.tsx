import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import Footer from './Footer';

export default {
  title: 'Layout Components/Footer',
  component: Footer,
  argTypes: {
    author: { control: { type: 'text' } },
    pages: { control: { type: 'array' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  author: 'Hello World!',
  pages: [
    { label: 'お問い合わせ', url: 'https://example.com' },
    { label: '利用規約', url: 'https://example.com' },
  ],
};

export const Long = Template.bind({});
Long.args = {
  author: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ',
  pages: [
    { label: '吾輩は猫である。名前はまだ無い', url: 'https://example.com' },
    { label: 'どこで生れたかとんと見当がつかぬ', url: 'https://example.com' },
    { label: '何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している', url: 'https://example.com' },
    { label: '吾輩はここで始めて人間というものを見た', url: 'https://example.com' },
  ],
};

export const NoPages = Template.bind({});
NoPages.args = {
  author: 'Hello World!',
};
