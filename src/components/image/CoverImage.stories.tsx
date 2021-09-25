import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import CoverImage from './CoverImage';

export default {
  title: 'Common Components/CoverImage',
  component: CoverImage,
  argTypes: {
    src: { control: { type: 'text' } },
    children: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof CoverImage>;

const Template: ComponentStory<typeof CoverImage> = (args) => <CoverImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://placehold.jp/150x150.png',
  children: 'Hello World!',
  backgroundColor: '#ccc',
};

export const SetSize = Template.bind({});
SetSize.args = {
  src: 'https://placehold.jp/150x150.png',
  children: 'Hello World!',
  height: 180,
  backgroundColor: '#ccc',
};

export const LongText = Template.bind({});
LongText.args = {
  src: 'https://placehold.jp/150x150.png',
  children: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ',
  backgroundColor: '#ccc',
};

export const NoSrc = Template.bind({});
NoSrc.args = {
  children: 'Hello World!',
  backgroundColor: '#ccc',
};
