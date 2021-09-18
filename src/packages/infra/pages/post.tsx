import type { ILayoutComponent } from '$/domain/app/layout';
import type { IPostPage, Props, Params, Paths, IPostPageProps } from '$/domain/pages/post';
import type { IPostManager } from '$/domain/post/manager';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { fromEntity, toEntity } from '$/domain/post/dto/postDetail';
import Id from '$/domain/post/valueObject/id';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import Date from '@/components/Date';

@singleton()
export class PostPage implements IPostPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): VFC<Props> {
    const component = memo(({ post }: Props) => {
      const entity = toEntity(post);
      return this.layoutComponent.render({}, <article>
        <h1>{entity.getTitle().value}</h1>
        <div>
          <Date date={entity.getCreatedAt().value}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: entity.getContent().value }}/>
      </article>);
    });
    component.displayName = 'PostPage';

    return component;
  }
}

@singleton()
export class PostPageProps implements IPostPageProps {
  public constructor(
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  public async getStaticPaths(): Promise<Paths> {
    return {
      paths: (await this.postManager.getIds()).map(id => ({
        params: { id: id.value },
      })),
      fallback: false,
    };
  }

  public async getStaticProps(params?: Params): Promise<Props> {
    if (!params) {
      throw new NotFoundException;
    }

    return {
      post: fromEntity(await this.postManager.fetch(Id.create(params.id))),
    };
  }
}
