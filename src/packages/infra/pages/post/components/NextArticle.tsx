import type { VFC } from 'react';
import clsx from 'clsx';
import { memo } from 'react';
import { Image } from '@/components';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';
import Link from '@/components/link/Link';
import styles from './PrevNextArticle.module.scss';

type Props = {
  thumbnail?: string;
  title: string;
  url: string;
  darkModeClass?: string;
};

const NextArticle: VFC<Props> = ({ thumbnail, title, url, darkModeClass }) => {
  return <Link href={url}>
    <Flex justifyContent="right" className={styles.article}>
      <Box className={styles.article__title}>{title}</Box>
      {thumbnail && <Image src={thumbnail} alt="next thumbnail" className={styles.article__thumbnail}/>}
      <Image
        src="/arrow2.png"
        alt="next article"
        transform="rotate(90deg)"
        className={clsx(styles.article__arrow, darkModeClass)}
      />
    </Flex>
  </Link>;
};

NextArticle.displayName = 'NextArticle';
export default memo(NextArticle);
