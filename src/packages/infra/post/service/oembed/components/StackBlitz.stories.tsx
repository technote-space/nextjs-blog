import type { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from '$/infra/pages/post/components/Article.module.scss';
import StackBlitz from './StackBlitz';

export default {
  title: 'Library Components/StackBlitz',
  component: StackBlitz,
  argTypes: {
    url: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof StackBlitz>;

const Template: ComponentStory<typeof StackBlitz> = (args) => <div className={styles.article}>
  <StackBlitz {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  url: 'https://stackblitz.com/edit/js-fkebjy?file=index.js',
};
