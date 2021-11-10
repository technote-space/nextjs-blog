import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { FaSun } from 'react-icons/fa';
import { storybookArgTypes } from '@/components/storybook.shared';
import IconButton from './IconButton';

export default {
  title: 'Common Components/IconButton',
  component: IconButton,
  argTypes: {
    variant: { control: { type: 'text' } },
    size: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <FaSun/>,
};
