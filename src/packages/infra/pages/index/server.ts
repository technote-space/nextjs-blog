import type { Settings } from '$/domain/app/settings';
import type { IIndexPageProps, Props } from '$/domain/pages';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity } from '$/domain/post/dto/post';
import { Post } from '$/domain/post/entity/post';

@singleton()
export class IndexPageProps implements IIndexPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
  ) {
  }

  public async getStaticProps(postType?: string): Promise<GetStaticPropsResult<Props>> {
    return {
      props: {
        posts: (await this.postFactory.all(postType)).map(post => fromEntity(post)),
        headerPages: (this.settings.pages?.header ?? []).map(page => ({
          label: page.title,
          url: Post.createUrlFromPostData(page, this.settings),
        })),
        footerPages: (this.settings.pages?.footer ?? []).map(page => ({
          label: page.title,
          url: Post.createUrlFromPostData(page, this.settings),
        })),
      },
      revalidate: this.settings.isIsr ? (this.settings.isrRevalidate ?? 60) : undefined,
    };
  }
}