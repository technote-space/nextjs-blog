import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import SubHeading from './SubHeading';

export default {
  title: 'Common Components/SubHeading',
  component: SubHeading,
  argTypes: {
    children: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof SubHeading>;

const Template: ComponentStory<typeof SubHeading> = (args) => <SubHeading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello World!',
};
