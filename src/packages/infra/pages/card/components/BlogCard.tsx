import type { VFC } from 'react';
import { escapeHtml } from '@/lib/helpers/string';
import { getDomainName } from '@/lib/helpers/url';
import styles from './BlogCard.module.scss';

type Props = {
  url: string;
  title?: string;
  description?: string;
  image: string;
  dominantColor?: string;
  canonical?: string;
  source?: string;
};

const BlogCard: VFC<Props> = ({ url, title, description, image, dominantColor, canonical, source }) => {
  return <div className={styles['blog-card']}>
    <a href={canonical || url} target="_blank" rel="noopener noreferrer">
      <div className={styles['blog-card__image']} style={{
        backgroundImage: `url(${image})`,
        backgroundColor: dominantColor ?? '#ccc',
      }}/>
      <div className={styles['blog-card__details']}>
        <div className={styles['blog-card__details__title']}>{title || url}</div>
        <div className={styles['blog-card__details__description']}>{description ?? ''}</div>
        <div className={styles['blog-card__details__source']}>
          <div className={styles['blog-card__details__source__favicon']} style={{
            backgroundImage: `url(https://www.google.com/s2/favicons?domain=${escapeHtml(getDomainName(url))})`,
          }}/>
          <div className={styles['blog-card__details__source__name']}>{source || getDomainName(url)}</div>
        </div>
      </div>
    </a>
  </div>;
};
BlogCard.displayName = 'BlogCard';

export default BlogCard;
