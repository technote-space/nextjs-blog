import type { Props } from '$/domain/pages';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { toEntity as postDtoToEntity } from '$/domain/post/dto/post';
import { toEntity as tagDtoToEntity } from '$/domain/post/dto/tag';

type RouterPathGenerator = (page: number) => string;
export type HookProps = Props & { path: RouterPathGenerator };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ headerPages, footerPages, items, tag, page, totalPage, path }: HookProps) => {
  const postEntities = useMemo(() => items.map(post => postDtoToEntity(post)), [items]);
  const tagEntity = useMemo(() => tag ? tagDtoToEntity(tag) : undefined, [tag]);
  const router = useRouter();
  const handlePageChange = useCallback((selectedItem: { selected: number }) => {
    // selected は 0〜
    router.push({ pathname: path(selectedItem.selected + 1) }).then();
  }, [router, path]);

  useEffect(() => {
    const pages = [1, totalPage];
    if (page > 1) pages.push(page);
    if (page > 2) pages.push(page - 1);
    if (page < totalPage - 1) pages.push(page + 2);
    if (page < totalPage - 2) pages.push(page + 3);
    [...new Set(pages)].forEach(p => {
      router.prefetch(path(p)).then();
    });
  }, [router, path, page, tag, totalPage]);

  return {
    layoutProps: {
      headerPages,
      footerPages,
      seo: {
        title: page > 0 ? `${page + 1}ページ目` : undefined,
        canonical: page > 0 ? `/paged/${page + 1}/` : undefined,
      },
    },
    viewProps: {
      posts: postEntities,
      currentPage: page,
      totalCount: items.length,
      totalPage,
      handlePageChange,
      tag: tagEntity,
    },
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
