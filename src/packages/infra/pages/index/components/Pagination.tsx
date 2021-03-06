import type { FC } from 'react';
import { memo } from 'react';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type Props = {
  totalPage: number;
  page?: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  previousLabel?: React.ReactNode | undefined;
  nextLabel?: React.ReactNode | undefined;
  breakLabel?: string | React.ReactNode | undefined;
  onPageChange?(selectedItem: { selected: number }): void;
}

const Pagination: FC<Props> = ({
  totalPage,
  page,
  pageRangeDisplayed,
  marginPagesDisplayed,
  previousLabel,
  nextLabel,
  breakLabel,
  onPageChange,
}) => {
  return <ReactPaginate
    pageCount={totalPage}
    forcePage={page === undefined ? undefined : Math.min(Math.max(0, page), totalPage - 1)}
    pageRangeDisplayed={pageRangeDisplayed ?? 3}
    marginPagesDisplayed={marginPagesDisplayed ?? 1}
    previousLabel={previousLabel ?? '<'}
    nextLabel={nextLabel ?? '>'}
    breakLabel={breakLabel ?? '...'}
    containerClassName={styles.pagination}
    activeClassName={styles.active}
    breakClassName={styles.break}
    previousClassName={styles.pagination__previous}
    nextClassName={styles.pagination__next}
    disabledClassName={styles.pagination__disabled}
    onPageChange={onPageChange}
  />;
};
Pagination.displayName = 'Pagination';

export default memo(Pagination);
