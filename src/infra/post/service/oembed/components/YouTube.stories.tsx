import type { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from '@/infra/pages/post/components/Article.module.scss';
import YouTube from './YouTube';

export default {
  title: 'Library Components/YouTube',
  component: YouTube,
  argTypes: {
    url: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof YouTube>;

const Template: ComponentStory<typeof YouTube> = (args) => <div className={styles.article}>
  <YouTube {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  url: 'https://www.youtube.com/watch?v=dHXC_ahjtEE',
};

export const InvalidUrl = Template.bind({});
InvalidUrl.args = {
  url: 'https://www.youtube.com/watch',
};
