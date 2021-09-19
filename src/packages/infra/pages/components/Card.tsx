import type { StyleProps } from '@/components/wrap';
import type { LinkProps } from 'next/link';
import type { VFC } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Date from '@/components/date/Date';
import MainHeading from '@/components/heading/MainHeading';
import SubHeading from '@/components/heading/SubHeading';
import Thumbnail from '@/components/image/Thumbnail';
import Flex from '@/components/layout/Flex';

type Props = StyleProps & {
  url: LinkProps['href'];
  thumbnail?: string;
  title: string;
  excerpt: string;
  createdAt: dayjs.ConfigType;
  dateFormat?: string;
};

const Card: VFC<Props> = ({ url, thumbnail, title, excerpt, createdAt, dateFormat, ...props }) => {
  return <Link href={url}>
    <a>
      <Flex flexDir="row" backgroundColor="white" p={3} cursor="pointer" {...props}>
        <Thumbnail src={thumbnail} htmlWidth={300} htmlHeight={180}/>
        <Flex flexDir="column" p={3} flexGrow={1}>
          <MainHeading mb={4}>
            {title}
          </MainHeading>
          <SubHeading>
            {excerpt}
          </SubHeading>
          <Date date={createdAt} format={dateFormat ?? 'YYYY.MM.DD'} textAlign="right"/>
        </Flex>
      </Flex>
    </a>
  </Link>;
};

Card.displayName = 'Card';
export default Card;
