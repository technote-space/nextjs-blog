import type { IIndexPage, Props } from '$/domain/pages';
import type { ILayoutComponent } from '$/domain/app/layout';
import { memo } from 'react';
import Link from 'next/link';
import { pagesPath } from '@/lib/$path';
import Date from '@/components/date';
import { singleton, inject } from 'tsyringe';

@singleton()
export class IndexPage implements IIndexPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create() {
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
            {posts.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={pagesPath.posts._id(id).$url()}>
                  <a>{title}</a>
                </Link>
                <br/>
                <small>
                  <Date date={date}/>
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
