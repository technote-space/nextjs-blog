import type { ComponentStory, ComponentMeta } from '@storybook/react';
import PrevArticle from './PrevArticle';

export default {
  title: 'Domain Components/PrevArticle',
  component: PrevArticle,
  argTypes: {
    thumbnail: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    url: { control: { type: 'text' } },
    darkModeClass: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof PrevArticle>;

const Template: ComponentStory<typeof PrevArticle> = (args) => <div style={{ maxWidth: '1000px' }}>
  <PrevArticle {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '記事タイトル',
  url: 'https://example.com',
};


export const LongTitle = Template.bind({});
LongTitle.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '長い記事タイトルのテスト長い記事タイトルのテスト長い記事タイトルのテスト長い記事タイトルのテスト長い記事タイトルのテスト',
  url: 'https://example.com',
};

export const Dark = Template.bind({});
Dark.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '記事タイトル',
  url: 'https://example.com',
  darkModeClass: 'dark',
};

export const Light = Template.bind({});
Light.args = {
  thumbnail: 'https://placehold.jp/150x150.png',
  title: '記事タイトル',
  url: 'https://example.com',
  darkModeClass: 'light',
};

