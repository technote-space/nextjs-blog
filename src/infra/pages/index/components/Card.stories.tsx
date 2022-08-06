import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import Card from './Card';

export default {
  title: 'Domain Components/Card',
  component: Card,
  argTypes: {
    url: { control: { type: 'text' } },
    thumbnail: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    excerpt: { control: { type: 'text' } },
    createdAt: { control: { type: 'date' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩は猫である',
  excerpt: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
};

export const NoThumbnail = Template.bind({});
NoThumbnail.args = {
  title: '吾輩は猫である',
  excerpt: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
};

export const Short = Template.bind({});
Short.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩は猫である',
  excerpt: '吾輩は猫である。',
};

export const Long = Template.bind({});
Long.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ',
  excerpt: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
};
