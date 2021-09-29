import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { storybookArgTypes } from '@/components/wrap';
import List from './List';
import ListItem from './ListItem';

export default {
  title: 'Common Components/List',
  component: List,
  subcomponents: { ListItem },
  argTypes: {
    children: { control: { type: 'text' } },
    ...storybookArgTypes,
  },
} as ComponentMeta<typeof List>;

const EmptyTemplate: ComponentStory<typeof List> = (args) => <List {...args} />;
const OneItemTemplate: ComponentStory<typeof List> = ({ children, ...args }) => <List {...args} >
  <ListItem>{children}</ListItem>
</List>;
const MultipleItemsTemplate: ComponentStory<typeof List> = ({ children, ...args }) => <List {...args} >
  <ListItem>{children}</ListItem>
  <ListItem>{children}</ListItem>
  <ListItem>{children}</ListItem>
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
