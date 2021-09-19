import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import dayjs from 'dayjs';
import { memo } from 'react';
import { wrap } from '@/components/wrap';

type Props = StyleProps & {
  date: dayjs.ConfigType;
  format?: string;
};

const WrappedTime = wrap('time');
const Date: VFC<Props> = ({ date, format, ...props }) => {
  const instance = dayjs(date);
  return <WrappedTime
    dateTime={instance.toISOString()}
    {...props}
  >
    {instance.format(format ?? 'YYYY/MM/DD')}
  </WrappedTime>;
};

Date.displayName = 'Date';
export default memo(Date);
