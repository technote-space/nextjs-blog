import type { ComponentStory, ComponentMeta } from '@storybook/react';
import dayjs from 'dayjs';
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
  date: dayjs(),
};

export const Format = Template.bind({});
Format.args = {
  date: dayjs(),
  format: 'YYYY年MM月DD日',
};
