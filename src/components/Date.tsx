import type { VFC } from 'react';
import dayjs from 'dayjs';

type Props = {
  date: dayjs.ConfigType;
  format?: string;
};

const Date: VFC<Props> = ({ date, format }) => {
  const instance = dayjs(date);
  return <time dateTime={instance.toISOString()}>{instance.format(format ?? 'YYYY/MM/DD')}</time>;
};

Date.displayName = 'Date';
export default Date;
