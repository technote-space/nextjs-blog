import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import dayjs from 'dayjs';
import Date from '@/components/date/Date';
import MainHeading from '@/components/heading/MainHeading';
import SubHeading from '@/components/heading/SubHeading';
import Thumbnail from '@/components/image/Thumbnail';
import Flex from '@/components/layout/Flex';

type Props = StyleProps & {
  thumbnail?: string;
  title: string;
  excerpt: string;
  createdAt: dayjs.ConfigType;
  dateFormat?: string;
};

const defaultProps: StyleProps = {
  p: 3,
  flexDir: 'row',
  backgroundColor: 'white',
  cursor: 'pointer',
  alignItems: 'center',
};

const Card: VFC<Props> = ({ thumbnail, title, excerpt, createdAt, dateFormat, ...props }) => {
  return <Flex {...defaultProps} {...props}>
    <Thumbnail src={thumbnail} width={[150, 200, 200, 300]} height={[100, 120, 120, 180]}/>
    <Flex flexDir="column" p={3} flexGrow={1}>
      <MainHeading mb={4}>
        {title}
      </MainHeading>
      <SubHeading>
        {excerpt}
      </SubHeading>
      <Date date={createdAt} format={dateFormat ?? 'YYYY.MM.DD'} textAlign="right"/>
    </Flex>
  </Flex>;
};

Card.displayName = 'Card';
export default Card;
