import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import Tag from './Tag';

export default {
  title: 'Common Components/Tag',
  component: Tag,
  argTypes: {
    tag: { control: { type: 'text' } },
    iconColor: { control: { type: 'color' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  tag: 'Hello World!',
};
