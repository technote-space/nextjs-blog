import type { HooksParams } from '$/infra/app/layout/header/hooks';
import type { VFC } from 'react';
import { memo } from 'react';
import Header from '$/infra/app/layout/components/Header';

const View: VFC<HooksParams> = ({ title, pages }) => <Header
  title={title}
  pages={pages}
/>;

View.displayName = 'HeaderView';
export default memo(View);
