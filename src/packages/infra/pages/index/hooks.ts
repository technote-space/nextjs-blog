import type { Props } from '$/domain/pages';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { toEntity as postDtoToEntity } from '$/domain/post/dto/post';
import { toEntity as tagDtoToEntity } from '$/domain/post/dto/tag';

const parseNumberQuery = (page: string | string[] | undefined): number => {
  if (page === undefined) {
    return 0;
  }

  if (Array.isArray(page) && !page.length) {
    return 0;
  }

  const _page = Array.isArray(page) ? page[0] : page;
  if (/^\d+$/.test(_page)) {
    return Number(_page);
  }

  return 0;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ posts, tag }: Props) => {
  const postEntities = useMemo(() => posts.map(post => postDtoToEntity(post)), [posts]);
  const tagEntity = useMemo(() => tag ? tagDtoToEntity(tag) : undefined, [tag]);

  const router = useRouter();
  const { perPage, page } = router.query;
  const _perPage = Math.max(1, parseNumberQuery(perPage) || 10);
  const pageCount = Math.ceil(posts.length / _perPage);
  const _page = Math.min(Math.max(1, parseNumberQuery(page)), pageCount);

  const handlePageChange = useCallback((selectedItem: { selected: number }) => {
    // selected は 0〜
    router.push(`/?page=${selectedItem.selected + 1}`, undefined, { shallow: true, scroll: true }).then();
  }, [router]);
  const displayPosts = useMemo(() => postEntities.slice(_perPage * (_page - 1), _perPage * _page), [postEntities, _perPage, _page]);

  return {
    posts: displayPosts,
    perPage: _perPage,
    currentPage: _page - 1,
    totalCount: posts.length,
    pageCount,
    handlePageChange,
    tag: tagEntity,
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
