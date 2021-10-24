import type { HooksParams } from '$/infra/app/layout/header/hooks';
import type { VFC } from 'react';
import { memo } from 'react';
import Header from '$/infra/app/layout/components/Header';

const View: VFC<HooksParams> = ({ title, pages, toggleColorMode }) => <Header
  title={title}
  pages={pages}
  toggleColorMode={toggleColorMode}
/>;

View.displayName = 'HeaderView';
export default memo(View);
