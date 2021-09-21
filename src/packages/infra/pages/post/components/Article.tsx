import type { VFC } from 'react';
import dayjs from 'dayjs';
import Prism from 'prismjs';
import { memo, useEffect } from 'react';
import Date from '@/components/date/Date';
import CoverImage from '@/components/image/CoverImage';
import Box from '@/components/layout/Box';
import { wrap } from '@/components/wrap';
import styles from './Article.module.scss';

type Props = {
  thumbnail?: string;
  backgroundColor?: string;
  title: string;
  createdAt: dayjs.ConfigType;
  content: string;
};

const Article: VFC<Props> = ({ thumbnail, backgroundColor, title, createdAt, content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <wrap.article backgroundColor="white" p={6} boxShadow="0 0 8px #ccc">
    <header>
      <Date
        date={createdAt}
        format="YYYY.MM.DD"
        opacity={0.7}
        position="absolute"
        fontWeight="bold"
        mt={30} ml={50}
      />
      <CoverImage src={thumbnail} backgroundColor={backgroundColor}>
        <h1>{title}</h1>
      </CoverImage>
    </header>
    <Box className={styles.article} my={8} dangerouslySetInnerHTML={{ __html: content }}/>
  </wrap.article>;
};

Article.displayName = 'Article';
export default memo(Article);
