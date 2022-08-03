import type { HooksParams } from '$/infra/pages/post/hooks';
import type { FC } from 'react';
import dynamic from 'next/dynamic';

const Article = dynamic(() => import('$/infra/pages/post/components/Article'));

const View: FC<HooksParams['viewProps']> = ({ post, hideDate, prev, next, darkModeClass }) => <Article
  id={post.id.value}
  thumbnail={post.thumbnail?.value}
  backgroundColor={post.dominantColor?.value}
  title={post.title.value}
  createdAt={post.createdAt.value}
  content={post.content.value}
  hideDate={hideDate}
  tags={post.tags.map(tag => ({ slug: tag.slug.value, name: tag.getDisplayValue() }))}
  prevTitle={prev?.title.value}
  prevThumbnail={prev?.thumbnail?.value}
  prevUrl={prev?.getUrl()}
  nextTitle={next?.title.value}
  nextThumbnail={next?.thumbnail?.value}
  nextUrl={next?.getUrl()}
  darkModeClass={darkModeClass}
/>;

View.displayName = 'PostView';
export default View;
