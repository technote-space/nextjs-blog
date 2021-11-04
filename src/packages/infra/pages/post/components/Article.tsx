import type { VFC } from 'react';
import dayjs from 'dayjs';
import { memo } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import useAutoResizeIframe from '$/infra/pages/post/hooks/useAutoResizeIframe';
import Tag from '@/components/chip/Tag';
import Date from '@/components/date/Date';
import CoverImage from '@/components/image/CoverImage';
import Box from '@/components/layout/Box';
import { Article as ArticleComponent, Flex } from '@/components/wrap';
import styles from './Article.module.scss';

type Props = {
  thumbnail?: string;
  backgroundColor?: string;
  title: string;
  createdAt: dayjs.ConfigType;
  content: string;
  hideDate?: boolean;
  tags?: { slug: string; name: string }[];
};

const Article: VFC<Props> = ({ thumbnail, backgroundColor, title, createdAt, content, hideDate, tags }) => {
  useAutoResizeIframe();

  return <SimpleReactLightbox>
    <ArticleComponent p={[3, 3, 7, 7]} mx="auto" boxShadow="0 0 8px #ccc">
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
        {!!tags?.length && <Flex mt={3} flexWrap="wrap">
          {tags.map(tag => <Tag key={tag.slug} slug={tag.slug} name={tag.name}/>)}
        </Flex>}
      </header>
      <SRLWrapper>
        <Box className={styles.article} dangerouslySetInnerHTML={{ __html: content }}/>
      </SRLWrapper>
    </ArticleComponent>
  </SimpleReactLightbox>;
};

Article.displayName = 'Article';
export default memo(Article);
