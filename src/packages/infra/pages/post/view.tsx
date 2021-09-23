import type { Props } from '$/domain/pages/post';
import type { VFC } from 'react';
import Article from '$/infra/pages/post/components/Article';

const View: VFC<Props> = ({ post }) => {
  return <Article
    thumbnail={post.thumbnail ?? undefined}
    backgroundColor={post.dominantColor}
    title={post.title}
    createdAt={post.createdAt}
    content={post.content}
  />;
};

View.displayName = 'PostView';
export default View;
