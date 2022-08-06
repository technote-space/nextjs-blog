import type { FC } from 'react';
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

const PrevArticle: FC<Props> = ({ thumbnail, title, url, darkModeClass }) => {
  return <Link href={url}>
    <Flex className={styles.article}>
      <Image
        src="/arrow2.png"
        alt="prev article"
        transform="rotate(-90deg)"
        className={clsx(styles.article__arrow, darkModeClass)}
      />
      {thumbnail && <Image src={thumbnail} alt="prev thumbnail" className={styles.article__thumbnail}/>}
      <Box className={styles.article__title}>{title}</Box>
    </Flex>
  </Link>;
};

PrevArticle.displayName = 'PrevArticle';
export default memo(PrevArticle);
