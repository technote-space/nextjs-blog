import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import Thumbnail from './Thumbnail';

export default {
  title: 'Thumbnail',
  component: Thumbnail,
  argTypes: {
    src: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Thumbnail>;

const Template: ComponentStory<typeof Thumbnail> = (args) => <Thumbnail {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://placehold.jp/150x150.png',
};
