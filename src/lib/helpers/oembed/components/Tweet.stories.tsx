import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Tweet from './Tweet';
import styles from '$/infra/pages/post/components/Article.module.scss';

export default {
  title: 'Library Components/Tweet',
  component: Tweet,
  argTypes: {
    url: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Tweet>;

const Template: ComponentStory<typeof Tweet> = (args) => <div className={styles.article}>
  <Tweet {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  url: 'https://twitter.com/carterjwm/status/849813577770778624',
};
