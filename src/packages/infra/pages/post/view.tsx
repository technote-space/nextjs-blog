import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { VFC } from 'react';
import Article from '$/infra/pages/post/components/Article';

export type Props = {
  post: PostDetail;
};

const View: VFC<Props> = ({ post }) => {
  return <Article
    thumbnail={post.getThumbnail()?.value}
    backgroundColor={post.getDominantColor()?.value}
    title={post.getTitle().value}
    createdAt={post.getCreatedAt().value}
    content={post.getContent().value}
  />;
};

View.displayName = 'PostView';
export default View;
