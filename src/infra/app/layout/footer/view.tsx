import type { HooksParams } from '@/infra/app/layout/footer/hooks';
import type { FC } from 'react';
import clsx from 'clsx';
import { memo } from 'react';
import { Image } from '@/components';
import Footer from '@/infra/app/layout/components/Footer';
import styles from './footer.module.scss';

const View: FC<HooksParams> = ({ author, pages, scrollButtonClass, scrollToTop, darkModeClass }) => <>
  <span className={styles.scroll}>
      <Image src="/images/arrow.png" alt="arrow" className={clsx(scrollButtonClass, darkModeClass)} onClick={scrollToTop}/>
  </span>
  <Footer
    author={author}
    pages={pages}
  />
</>;

View.displayName = 'FooterView';
export default memo(View);
