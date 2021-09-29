import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const Date = dynamic(() => import('@/components/date/Date'));
const MainHeading = dynamic(() => import('@/components/heading/MainHeading'));
const SubHeading = dynamic(() => import('@/components/heading/SubHeading'));
const Thumbnail = dynamic(() => import('@/components/image/Thumbnail'));
const Flex = dynamic(() => import('@/components/layout/Flex'));

type Props = StyleProps & {
  thumbnail?: string;
  title: string;
  excerpt: string;
  createdAt: dayjs.ConfigType;
  dateFormat?: string;
};

const defaultProps: StyleProps = {
  mx: 'auto',
  backgroundColor: 'white',
  cursor: 'pointer',
  boxSizing: 'border-box',
  borderWidth: 1,
  borderColor: '#ccc',
  transitionDuration: '0.3s',
  transform: 'auto-gpu',
  _hover: {
    backgroundColor: '#fbffff',
    boxShadow: '0 2px 6px #ccc',
    translateY: -1,
  },
};

const Card: VFC<Props> = ({ thumbnail, title, excerpt, createdAt, dateFormat, ...props }) =>
  <Flex {...defaultProps} {...props}>
    <Flex flexDir="row" display={['none', 'none', 'flex', 'flex']} flexGrow={1} p={3}>
      <Thumbnail src={thumbnail} width={[120, 200, 200, 300]} height={[70, 120, 120, 180]} alignSelf="center"/>
      <Flex flexDir="column" p={3} flexGrow={1}>
        <MainHeading mb={4}>
          {title}
        </MainHeading>
        <SubHeading>
          {excerpt}
        </SubHeading>
        <Date
          date={createdAt}
          format={dateFormat ?? 'YYYY.MM.DD'}
          display="flex"
          flexGrow={1}
          justifyContent="end"
          alignItems="end"
        />
      </Flex>
    </Flex>
    <Flex flexDir="column" display={['flex', 'flex', 'none', 'none']} flexGrow={1} p={2}>
      <Flex flexDir="row" alignItems="center" mb={2}>
        <Thumbnail src={thumbnail} width={[120, 200, 200, 300]} height={[70, 120, 120, 180]}/>
        <MainHeading ml={1}>
          {title}
        </MainHeading>
      </Flex>
      <SubHeading display={['flex', 'flex', 'none', 'none']}>
        {excerpt}
      </SubHeading>
      <Date
        date={createdAt}
        format={dateFormat ?? 'YYYY.MM.DD'}
        display="flex"
        flexGrow={1}
        justifyContent="end"
        alignItems="end"
      />
    </Flex>
  </Flex>;

Card.displayName = 'Card';
export default memo(Card);
