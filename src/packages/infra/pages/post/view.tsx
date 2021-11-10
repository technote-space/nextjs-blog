import type { HooksParams } from '$/infra/pages/post/hooks';
import type { VFC } from 'react';
import dynamic from 'next/dynamic';

const Article = dynamic(() => import('$/infra/pages/post/components/Article'));

const View: VFC<HooksParams['viewProps']> = ({ post, hideDate, prev, next, darkModeClass }) => <Article
  id={post.getId().value}
  thumbnail={post.getThumbnail()?.value}
  backgroundColor={post.getDominantColor()?.value}
  title={post.getTitle().value}
  createdAt={post.getCreatedAt().value}
  content={post.getContent().value}
  hideDate={hideDate}
  tags={post.getTags().map(tag => ({ slug: tag.getSlug().value, name: tag.getDisplayValue() }))}
  prevTitle={prev?.getTitle().value}
  prevThumbnail={prev?.getThumbnail()?.value}
  prevUrl={prev?.getUrl()}
  nextTitle={next?.getTitle().value}
  nextThumbnail={next?.getThumbnail()?.value}
  nextUrl={next?.getUrl()}
  darkModeClass={darkModeClass}
/>;

View.displayName = 'PostView';
export default View;
