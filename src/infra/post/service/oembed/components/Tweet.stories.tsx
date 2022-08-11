import type { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from '@/infra/pages/post/components/Article.module.scss';
import Tweet from './Tweet';

export default {
  title: 'Library Components/Tweet',
  component: Tweet,
  argTypes: {
    url: { control: { type: 'text' } },
  },
  decorators: [(Story) => {
    const widgets = (window as { twttr?: { widgets: { load: () => void } } })?.twttr?.widgets;
    if (widgets) {
      widgets.load();
    }

    return <Story/>;
  }],
} as ComponentMeta<typeof Tweet>;

const Template: ComponentStory<typeof Tweet> = (args) => <div className={styles.article}>
  <Tweet {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  url: 'https://twitter.com/carterjwm/status/849813577770778624',
};
