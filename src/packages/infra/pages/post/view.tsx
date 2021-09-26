import type { HooksParams } from '$/infra/pages/post/hooks';
import type { VFC } from 'react';
import Article from '$/infra/pages/post/components/Article';

const View: VFC<HooksParams['viewProps']> = ({ post }) => <Article
  thumbnail={post.getThumbnail()?.value}
  backgroundColor={post.getDominantColor()?.value}
  title={post.getTitle().value}
  createdAt={post.getCreatedAt().value}
  content={post.getContent().value}
/>;

View.displayName = 'PostView';
export default View;
