import type { HooksParams } from '@/infra/pages/index/hooks';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { pagesPath } from '@/lib/$path';

const Card = dynamic(() => import('@/infra/pages/index/components/Card'));
const Pagination = dynamic(() => import('@/infra/pages/index/components/Pagination'), { ssr: false });
const Flex = dynamic(() => import('@/components/layout/Flex'));
const List = dynamic(() => import('@/components/layout/List'));
const ListItem = dynamic(() => import('@/components/layout/ListItem'));
const Link = dynamic(() => import('@/components/link/Link'));
const Tag = dynamic(() => import('@/components/chip/Tag'));

const View: FC<HooksParams['viewProps']> = ({ posts, currentPage, totalCount, totalPage, handlePageChange, tag }) => <>
  {!!tag && <Tag
    name={tag.getDisplayValue()}
    fontSize={[15, 18, 25, 25]}
  />}
  <List>
    {posts.map((post) => (
      <ListItem key={post.id.value}>
        <Link href={pagesPath.posts._id(post.id.value).$url()}>
          <Card
            thumbnail={post.thumbnail?.value}
            title={post.title.value}
            excerpt={post.excerpt.value}
            createdAt={post.createdAt.value}
            my={4}
          />
        </Link>
      </ListItem>
    ))}
  </List>
  {totalPage > 1 && <Flex my={5}>
    <Pagination
      page={currentPage}
      totalPage={totalPage}
      onPageChange={handlePageChange}
    />
  </Flex>}
  {!totalCount && <Flex>
    記事がありません
  </Flex>}
</>;

View.displayName = 'IndexView';
export default memo(View);
