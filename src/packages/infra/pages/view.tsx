import type { Props } from '$/domain/pages';
import type { VFC } from 'react';
import Link from 'next/link';
import Card from '$/infra/pages/components/Card';
import { toEntity } from '$/infra/post/dto/post';
import List from '@/components/layout/List';
import { pagesPath } from '@/lib/$path';

const View: VFC<Props> = ({ posts }) => {
  return <List>
    {posts.map(post => toEntity(post)).map((post) => (
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
