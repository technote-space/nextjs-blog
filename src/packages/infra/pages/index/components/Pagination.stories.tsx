import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from './Pagination';

export default {
  title: 'Domain Components/Pagination',
  component: Pagination,
  argTypes: {
    perPage: { control: { type: 'number' } },
    page: { control: { type: 'number' } },
    totalCount: { control: { type: 'number' } },
    pageRangeDisplayed: { control: { type: 'number' } },
    marginPagesDisplayed: { control: { type: 'number' } },
    previousLabel: { control: { type: 'text' } },
    nextLabel: { control: { type: 'text' } },
    breakLabel: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  perPage: 10,
  page: 3,
  totalCount: 100,
};
