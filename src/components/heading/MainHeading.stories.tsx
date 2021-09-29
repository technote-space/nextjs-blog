import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/storybook.shared';
import MainHeading from './MainHeading';

export default {
  title: 'Common Components/MainHeading',
  component: MainHeading,
  argTypes: {
    children: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof MainHeading>;

const Template: ComponentStory<typeof MainHeading> = (args) => <MainHeading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello World!',
};
