import type { VFC } from 'react';
import Link from 'next/link';
import { Post } from '$/domain/post/entity/post';
import Card from '$/infra/pages/index/components/Card';
import List from '@/components/layout/List';
import { pagesPath } from '@/lib/$path';

export type Props = {
  posts: Post[]
};

const View: VFC<Props> = ({ posts }) => {
  return <List>
    {posts.map((post) => (
      <List.Item key={post.getId().value} mx={3}>
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
  </List>;
};

View.displayName = 'IndexView';
export default View;
