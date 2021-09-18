import type { ComponentStory, ComponentMeta } from '@storybook/react';
import SubHeading from './SubHeading';

export default {
  title: 'SubHeading',
  component: SubHeading,
  argTypes: {
    children: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof SubHeading>;

const Template: ComponentStory<typeof SubHeading> = (args) => <SubHeading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello World!',
};
