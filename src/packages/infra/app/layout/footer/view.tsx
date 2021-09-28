import type { HooksParams } from '$/infra/app/layout/footer/hooks';
import type { VFC } from 'react';
import { memo } from 'react';
import Footer from '$/infra/app/layout/components/Footer';

const View: VFC<HooksParams> = ({ author, pages }) => <Footer
  author={author}
  pages={pages}
/>;

View.displayName = 'FooterView';
export default memo(View);
