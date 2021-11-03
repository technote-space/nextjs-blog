import type { HooksParams } from '$/infra/pages/post/hooks';
import type { VFC } from 'react';
import dynamic from 'next/dynamic';

const Article = dynamic(() => import('$/infra/pages/post/components/Article'));

const View: VFC<HooksParams['viewProps']> = ({ post, hideDate }) => <Article
  thumbnail={post.getThumbnail()?.value}
  backgroundColor={post.getDominantColor()?.value}
  title={post.getTitle().value}
  createdAt={post.getCreatedAt().value}
  content={post.getContent().value}
  hideDate={hideDate}
  tags={post.getTags().map(tag => tag.getSlug().value)}
/>;

View.displayName = 'PostView';
export default View;
