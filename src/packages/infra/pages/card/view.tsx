import type { HooksParams } from '$/infra/pages/card/hooks';
import type { VFC } from 'react';
import { memo } from 'react';
import BlogCard from './components/BlogCard';

const View: VFC<HooksParams> = ({ url, image, dominantColor, title, description, canonical, source }) => {
  if (!image) {
    return <span style={{ textDecoration: 'line-through' }}>{url}</span>;
  }

  return <BlogCard
    url={url}
    title={title ?? undefined}
    description={description ?? undefined}
    image={image}
    dominantColor={dominantColor ?? undefined}
    canonical={canonical ?? undefined}
    source={source ?? undefined}
  />;
};

View.displayName = 'CardView';
export default memo(View);
