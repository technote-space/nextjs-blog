import type { FC } from 'react';
import dayjs from 'dayjs';
import { memo } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import { Article as ArticleComponent, Divider } from '@/components';
import Tag from '@/components/chip/Tag';
import Date from '@/components/date/Date';
import CoverImage from '@/components/image/CoverImage';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import NextArticle from '@/infra/pages/post/components/NextArticle';
import PrevArticle from '@/infra/pages/post/components/PrevArticle';
import useAutoResizeIframe from '@/infra/pages/post/hooks/useAutoResizeIframe';
import useTwitterWidget from '@/infra/pages/post/hooks/useTwitterWidget';
import styles from './Article.module.scss';

type Props = {
  id?: string;
  thumbnail?: string;
  backgroundColor?: string;
  title: string;
  createdAt: dayjs.ConfigType;
  content: string;
  hideDate?: boolean;
  tags?: { slug: string; name: string }[];
  prevTitle?: string;
  prevThumbnail?: string;
  prevUrl?: string;
  nextTitle?: string;
  nextThumbnail?: string;
  nextUrl?: string;
  darkModeClass?: string;
};

const Article: FC<Props> = ({
  id,
  thumbnail,
  backgroundColor,
  title,
  createdAt,
  content,
  hideDate,
  tags,
  prevTitle,
  prevThumbnail,
  prevUrl,
  nextTitle,
  nextThumbnail,
  nextUrl,
  darkModeClass,
}) => {
  useAutoResizeIframe(id);
  useTwitterWidget(id);

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
      {((prevTitle && prevUrl) || (nextTitle && nextUrl)) && <Divider my={10}/>}
      {prevTitle && prevUrl && <PrevArticle
        title={prevTitle}
        thumbnail={prevThumbnail}
        url={prevUrl}
        darkModeClass={darkModeClass}
      />}
      {nextTitle && nextUrl && <NextArticle
        title={nextTitle}
        thumbnail={nextThumbnail}
        url={nextUrl}
        darkModeClass={darkModeClass}
      />}
    </ArticleComponent>
  </SimpleReactLightbox>;
};

Article.displayName = 'Article';
export default memo(Article);
