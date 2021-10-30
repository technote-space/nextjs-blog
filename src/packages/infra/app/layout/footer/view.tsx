import type { HooksParams } from '$/infra/app/layout/footer/hooks';
import type { VFC } from 'react';
import clsx from 'clsx';
import { memo } from 'react';
import Footer from '$/infra/app/layout/components/Footer';
import { Image } from '@/components/wrap';
import styles from './footer.module.scss';

const View: VFC<HooksParams> = ({ author, pages, scrollButtonClass, scrollToTop, darkModeClass }) => <>
  <span className={styles.scroll}>
      <Image src="/arrow.png" alt="arrow" className={clsx(scrollButtonClass, darkModeClass)} onClick={scrollToTop}/>
  </span>
  <Footer
    author={author}
    pages={pages}
  />
</>;

View.displayName = 'FooterView';
export default memo(View);
