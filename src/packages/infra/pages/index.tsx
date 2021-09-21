import type { ILayoutComponent } from '$/domain/app/layout';
import type { IIndexPage, IIndexPageProps, Props } from '$/domain/pages';
import type { IPostManager } from '$/domain/post/manager';
import type { VFC } from 'react';
import Link from 'next/link';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import Card from '$/infra/pages/components/Card';
import { fromEntity, toEntity } from '$/infra/post/dto/post';
import List from '@/components/layout/List';
import { pagesPath } from '@/lib/$path';

@singleton()
export class IndexPage implements IIndexPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): VFC<Props> {
    const component = memo(({ posts }: Props) => {
      return this.layoutComponent.render({}, <List>
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
      </List>);
    });
    component.displayName = 'IndexPage';

    return component;
  }
}

@singleton()
export class IndexPageProps implements IIndexPageProps {
  public constructor(
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  public async getStaticProps(): Promise<Props> {
    return {
      posts: (await this.postManager.all()).map(post => fromEntity(post)),
    };
  }
}
