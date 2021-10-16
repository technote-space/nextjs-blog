import type { ComponentStory, ComponentMeta } from '@storybook/react';
import BlogCard from './BlogCard';

export default {
  title: 'Library Components/BlogCard',
  component: BlogCard,
  argTypes: {
    url: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    image: { control: { type: 'text' } },
    dominantColor: { control: { type: 'color' } },
    canonical: { control: { type: 'text' } },
    source: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof BlogCard>;

const Template: ComponentStory<typeof BlogCard> = (args) => <BlogCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: 'https://example.com',
  title: '吾輩は猫である',
  description: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
  image: 'https://user-images.githubusercontent.com/39912269/134110725-899217f2-03bb-44b7-a3bd-910b5d19c1a9.png',
  dominantColor: '#ccc',
  canonical: 'https://example.com',
  source: 'example',
};

export const Minimum = Template.bind({});
Minimum.args = {
  url: 'https://example.com',
  image: 'https://user-images.githubusercontent.com/39912269/134110725-899217f2-03bb-44b7-a3bd-910b5d19c1a9.png',
};
