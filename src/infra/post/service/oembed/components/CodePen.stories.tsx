import type { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from '@/infra/pages/post/components/Article.module.scss';
import CodePen from './CodePen';

export default {
  title: 'Library Components/CodePen',
  component: CodePen,
  argTypes: {
    url: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof CodePen>;

const Template: ComponentStory<typeof CodePen> = (args) => <div className={styles.article}>
  <CodePen {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  url: 'https://codepen.io/technote-space/pen/NWgLZRY',
};
