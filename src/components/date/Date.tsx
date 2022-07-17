import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import dayjs from 'dayjs';
import { memo } from 'react';
import { Time } from '@/components/wrap';

type Props = StyleProps & {
  date: dayjs.ConfigType;
  format?: string;
};

const defaultProps: StyleProps = {
  fontSize: ['0.8em', '0.9em', '1em', '1em'],
};

const Date: FC<Props> = ({ date, format, ...props }) => {
  const instance = dayjs(date);
  return <Time
    dateTime={instance.toISOString()}
    {...defaultProps}
    {...props}
  >
    {instance.format(format ?? 'YYYY/MM/DD')}
  </Time>;
};

Date.displayName = 'Date';
export default memo(Date);
