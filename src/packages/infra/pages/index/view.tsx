import type { HooksParams } from '$/infra/pages/index/hooks';
import type { VFC } from 'react';
import Link from 'next/link';
import { memo } from 'react';
import Card from '$/infra/pages/index/components/Card';
import Pagination from '$/infra/pages/index/components/Pagination';
import Flex from '@/components/layout/Flex';
import List from '@/components/layout/List';
import { pagesPath } from '@/lib/$path';

const View: VFC<HooksParams> = ({ posts, perPage, currentPage, totalCount, handlePageChange }) => <>
  <List>
    {posts.map((post) => (
      <List.Item key={post.getId().value}>
        <Link href={pagesPath.posts._id(post.getId().value).$url()}>
          <a>
            <Card
              thumbnail={post.getThumbnail()?.value}
              title={post.getTitle().value}
              excerpt={post.getExcerpt().value}
              createdAt={post.getCreatedAt().value}
              my={4}
            />
          </a>
        </Link>
      </List.Item>
    ))}
  </List>
  <Flex my={5}>
    <Pagination
      perPage={perPage}
      page={currentPage}
      totalCount={totalCount}
      onPageChange={handlePageChange}
    />
  </Flex>
</>;

View.displayName = 'IndexView';
export default memo(View);
