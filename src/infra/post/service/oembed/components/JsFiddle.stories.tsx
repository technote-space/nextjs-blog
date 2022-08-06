import type { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from '@/infra/pages/post/components/Article.module.scss';
import JsFiddle from './JsFiddle';

export default {
  title: 'Library Components/JsFiddle',
  component: JsFiddle,
  argTypes: {
    url: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof JsFiddle>;

const Template: ComponentStory<typeof JsFiddle> = (args) => <div className={styles.article}>
  <JsFiddle {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  url: 'https://jsfiddle.net/Technote/3upmsz2y/2/',
};
