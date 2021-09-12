import type { VFC } from 'react';
import dayjs from 'dayjs';

type Props = {
  date: string;
};

const Date: VFC<Props> = ({ date }) => {
  const d = dayjs(date);
  return <time dateTime={d.toISOString()}>{d.format('YYYY-MM-DD')}</time>;
};
Date.displayName = 'Date';
export default Date;
