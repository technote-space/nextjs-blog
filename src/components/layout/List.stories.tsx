import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import List from './List';

export default {
  title: 'List',
  component: List,
  subcomponents: { ListItem: List.Item },
  argTypes: {
    children: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof List>;

const EmptyTemplate: ComponentStory<typeof List> = (args) => <List {...args} />;
const OneItemTemplate: ComponentStory<typeof List> = ({ children, ...args }) => <List {...args} >
  <List.Item>{children}</List.Item>
</List>;
const MultipleItemsTemplate: ComponentStory<typeof List> = ({ children, ...args }) => <List {...args} >
  <List.Item>{children}</List.Item>
  <List.Item>{children}</List.Item>
  <List.Item>{children}</List.Item>
</List>;

export const Empty = EmptyTemplate.bind({});
Empty.args = {};

export const OneItem = OneItemTemplate.bind({});
OneItem.args = {
  children: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
};

export const MultipleItems = MultipleItemsTemplate.bind({});
MultipleItems.args = {
  children: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ...',
};
