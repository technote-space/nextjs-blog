import type { IPostPage, Props } from '$/domain/pages/post';
import type { ILayoutComponent } from '$/domain/app/layout';
import { memo } from 'react';
import Date from '@/components/date';
import { singleton, inject } from 'tsyringe';

@singleton()
export class PostPage implements IPostPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create() {
    const component = memo(({ post }: Props) => {
      return this.layoutComponent.render({}, <article>
        <h1>{post.title}</h1>
        <div>
          <Date date={post.date}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}/>
      </article>);
    });
    component.displayName = 'PostPage';

    return component;
  }
}
