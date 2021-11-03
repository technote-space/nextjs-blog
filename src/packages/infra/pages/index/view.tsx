import type { HooksParams } from '$/infra/pages/index/hooks';
import type { VFC } from 'react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { pagesPath } from '@/lib/$path';

const Card = dynamic(() => import('$/infra/pages/index/components/Card'));
const Pagination = dynamic(() => import('$/infra/pages/index/components/Pagination'), { ssr: false });
const Flex = dynamic(() => import('@/components/layout/Flex'));
const List = dynamic(() => import('@/components/layout/List'));
const ListItem = dynamic(() => import('@/components/layout/ListItem'));
const Link = dynamic(() => import('@/components/link/Link'));

const View: VFC<HooksParams> = ({ posts, perPage, currentPage, totalCount, pageCount, handlePageChange }) => <>
  <List>
    {posts.map((post) => (
      <ListItem key={post.getId().value}>
        <Link href={pagesPath.posts._id(post.getId().value).$url()}>
          <Card
            thumbnail={post.getThumbnail()?.value}
            title={post.getTitle().value}
            excerpt={post.getExcerpt().value}
            createdAt={post.getCreatedAt().value}
            my={4}
          />
        </Link>
      </ListItem>
    ))}
  </List>
  {pageCount > 1 && <Flex my={5}>
    <Pagination
      perPage={perPage}
      page={currentPage}
      totalCount={totalCount}
      onPageChange={handlePageChange}
    />
  </Flex>}
  {!totalCount && <Flex>
    記事がありません
  </Flex>}
</>;

View.displayName = 'IndexView';
export default memo(View);
