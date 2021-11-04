import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import Tag from './Tag';

export default {
  title: 'Common Components/Tag',
  component: Tag,
  argTypes: {
    slug: { control: { type: 'text' } },
    name: { control: { type: 'Text' } },
    iconColor: { control: { type: 'color' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  slug: 'hello-world',
  name: 'Hello World!',
};

export const WithoutSlug = Template.bind({});
WithoutSlug.args = {
  name: 'Hello World!',
};
