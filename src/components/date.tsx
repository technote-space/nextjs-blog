import type { VFC } from 'react';
import dayjs from 'dayjs';

type Props = {
  date: dayjs.Dayjs;
};

const Date: VFC<Props> = ({ date }) => {
  return <time dateTime={date.toISOString()}>{date.format('YYYY-MM-DD')}</time>;
};

Date.displayName = 'Date';
export default Date;
