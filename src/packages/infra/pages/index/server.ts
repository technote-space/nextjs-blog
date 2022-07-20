import type { Settings } from '$/domain/app/settings';
import type { IIndexPageProps, Props } from '$/domain/pages';
import type { IPagedPageProps } from '$/domain/pages/paged';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';

@singleton()
export class IndexPageProps implements IIndexPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
    @inject('IPagedPageProps') private pagedPageProps: IPagedPageProps,
  ) {
  }

  public async getStaticProps(postType: string | undefined): Promise<GetStaticPropsResult<Props>> {
    return this.pagedPageProps.getStaticProps(postType, { page: '1' });
  }
}
