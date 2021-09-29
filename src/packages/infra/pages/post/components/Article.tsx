import type { VFC } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Prism from 'prismjs';
import { memo, useEffect } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import { wrap } from '@/components/wrap';
import styles from './Article.module.scss';

const Date = dynamic(() => import('@/components/date/Date'));
const CoverImage = dynamic(() => import('@/components/image/CoverImage'));
const Box = dynamic(() => import('@/components/layout/Box'));

type Props = {
  thumbnail?: string;
  backgroundColor?: string;
  title: string;
  createdAt: dayjs.ConfigType;
  content: string;
  hideDate?: boolean;
};

const Article: VFC<Props> = ({ thumbnail, backgroundColor, title, createdAt, content, hideDate }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <SimpleReactLightbox>
    <wrap.article backgroundColor="white" p={[3, 3, 7, 7]} mx="auto" boxShadow="0 0 8px #ccc">
      <header>
        {!hideDate && <Date
          date={createdAt}
          format="YYYY.MM.DD"
          opacity={0.7}
          position="absolute"
          fontWeight="bold"
          mt={['1.2em', '1.4em', '2em', '2em']}
          ml={['1.5em', '1.8em', '2.5em', '2.5em']}
        />}
        <CoverImage src={thumbnail} backgroundColor={backgroundColor}>
          <h1>{title}</h1>
        </CoverImage>
      </header>
      <SRLWrapper>
        <Box className={styles.article} dangerouslySetInnerHTML={{ __html: content }}/>
      </SRLWrapper>
    </wrap.article>
  </SimpleReactLightbox>;
};

Article.displayName = 'Article';
export default memo(Article);
