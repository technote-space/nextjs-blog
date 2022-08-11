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
    tags: { control: { type: 'object' } },
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
  tags: [
    {slug: 'hello', name: 'Hello'},
    {slug: 'world', name: 'World'},
  ],
};

export const NoThumbnail = Template.bind({});
NoThumbnail.args = {
  title: '吾輩は猫である',
  excerpt: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
  tags: [
    {slug: 'hello', name: 'Hello'},
    {slug: 'world', name: 'World'},
  ],
};

export const NoTags = Template.bind({});
NoTags.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩は猫である',
  excerpt: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
};

export const Short = Template.bind({});
Short.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩は猫である',
  excerpt: '吾輩は猫である。',
  tags: [
    {slug: 'hello', name: 'Hello'},
    {slug: 'world', name: 'World'},
  ],
};

export const Long = Template.bind({});
Long.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ',
  excerpt: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
  tags: [
    {slug: 'hello1', name: 'Hello1'},
    {slug: 'hello2', name: 'Hello2'},
    {slug: 'hello3', name: 'Hello3'},
    {slug: 'hello4', name: 'Hello4'},
    {slug: 'hello5', name: 'Hello5'},
    {slug: 'hello6', name: 'Hello6'},
    {slug: 'hello7', name: 'Hello7'},
    {slug: 'hello8', name: 'Hello8'},
    {slug: 'hello9', name: 'Hello9'},
    {slug: 'hello10', name: 'Hello10'},
  ],
};
