import type { HooksParams } from '$/infra/app/layout/header/hooks';
import type { FC } from 'react';
import { memo } from 'react';
import Header from '$/infra/app/layout/components/Header';

const View: FC<HooksParams> = (props) => <Header {...props}/>;

View.displayName = 'HeaderView';
export default memo(View);
