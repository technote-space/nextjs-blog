import type { VFC } from 'react';
import dayjs from 'dayjs';
import { memo } from 'react';
import Date from '@/components/date/Date';
import CoverImage from '@/components/image/CoverImage';
import Box from '@/components/layout/Box';

type Props = {
  thumbnail?: string;
  backgroundColor?: string;
  title: string;
  createdAt: dayjs.ConfigType;
  content: string;
};

const Article: VFC<Props> = ({ thumbnail, backgroundColor, title, createdAt, content }) => {
  return <article>
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
    <Box my={8} fontSize="1.15em" lineHeight={2} dangerouslySetInnerHTML={{ __html: content }}/>
  </article>;
};

Article.displayName = 'Article';
export default memo(Article);
