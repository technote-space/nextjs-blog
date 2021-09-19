import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import Card from './Card';

export default {
  title: 'Card',
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
  title: '吾輩わがはいは猫である',
  excerpt: '吾輩わがはいは猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかも...',
};

export const NoThumbnail = Template.bind({});
NoThumbnail.args = {
  title: '吾輩わがはいは猫である',
  excerpt: '吾輩わがはいは猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかも...',
};

export const Short = Template.bind({});
Short.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩わがはいは猫である',
  excerpt: '吾輩わがはいは猫である。',
};

export const Long = Template.bind({});
Long.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '吾輩わがはいは猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ',
  excerpt: '吾輩わがはいは猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかも...',
};
