import type { Settings } from '$/domain/app/settings';
import type { IIndexPageProps, Props } from '$/domain/pages';
import type { IPostManager } from '$/domain/post/manager';
import type { GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity } from '$/infra/post/dto/post';

@singleton()
export class IndexPageProps implements IIndexPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  public async getStaticProps(postType?: string): Promise<GetStaticPropsResult<Props>> {
    return {
      props: {
        posts: (await this.postManager.all(postType)).map(post => fromEntity(post)),
      },
      revalidate: this.settings.isIsr ? (this.settings.isrRevalidate ?? 60) : undefined,
    };
  }
}
