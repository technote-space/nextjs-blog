import type { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from '@/infra/pages/post/components/Article.module.scss';
import CodeSandbox from './CodeSandbox';

export default {
  title: 'Library Components/CodeSandbox',
  component: CodeSandbox,
  argTypes: {
    url: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof CodeSandbox>;

const Template: ComponentStory<typeof CodeSandbox> = (args) => <div className={styles.article}>
  <CodeSandbox {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  url: 'https://codesandbox.io/embed/keen-roman-kpz43?fontsize=14&hidenavigation=1&theme=dark',
};
