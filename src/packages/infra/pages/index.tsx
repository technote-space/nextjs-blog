import type { ILayoutComponent } from '$/domain/app/layout';
import type { IIndexPage, IIndexPageProps, Props } from '$/domain/pages';
import type { IPostManager } from '$/domain/post/manager';
import type { VFC } from 'react';
import Link from 'next/link';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { fromEntity, toEntity } from '$/domain/post/dto/post';
import Date from '@/components/Date';
import { pagesPath } from '@/lib/$path';

@singleton()
export class IndexPage implements IIndexPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): VFC<Props> {
    const component = memo(({ posts }: Props) => {
      return this.layoutComponent.render({ isHome: true }, <>
        <section>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this in{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
        <section>
          <h2>Blog</h2>
          <ul>
            {posts.map(post => toEntity(post)).map((post) => (
              <li key={post.getId().value}>
                <Link href={pagesPath.posts._id(post.getId().value).$url()}>
                  <a>{post.getTitle().value}</a>
                </Link>
                <div>
                  {post.getExcerpt().value}
                </div>
                <br/>
                <small>
                  <Date date={post.getCreatedAt().value}/>
                </small>
              </li>
            ))}
          </ul>
        </section>
      </>);
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
