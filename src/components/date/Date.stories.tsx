import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Date from './Date';

export default {
  title: 'Date',
  component: Date,
  argTypes: {
    date: { control: { type: 'date' } },
    format: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Date>;

const Template: ComponentStory<typeof Date> = (args) => <Date {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const Format = Template.bind({});
Format.args = {
  format: 'YYYY年MM月DD日',
};
