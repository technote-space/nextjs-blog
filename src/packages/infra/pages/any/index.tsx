import type { Settings } from '$/domain/app/settings';
import type { IAnyPageProps, Props, Params } from '$/domain/pages/any';
import type { IPostManager } from '$/domain/post/manager';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import pluralize from 'pluralize';
import { singleton, inject } from 'tsyringe';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Source from '$/domain/post/valueObject/source';

@singleton()
export class AnyPageProps implements IAnyPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  private static normalizeSource(source: string) {
    return source.replace(/^\//, '').replace(/\/$/, '');
  }

  public async getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
    if (this.settings.isIsr) {
      return {
        paths: [],
        fallback: 'blocking',
      };
    }

    const ids = Object.assign({}, ...(await this.postManager.getIds()).map(id => ({ [id.value]: true })));
    return {
      paths: (this.settings.urlMaps ?? [])
        .map(urlMap => ({
          id: Id.create({ source: Source.create(urlMap.destination.source), id: urlMap.destination.id }),
          source: urlMap.source,
        }))
        .filter(({ id }) => id.value in ids).map(({ source }) => ({
          params: { any: AnyPageProps.normalizeSource(source).split('/') },
        })),
      fallback: false,
    };
  }

  private findDestination(source: string): { source: string; id: string | number; postType?: string } | undefined {
    return (this.settings.urlMaps ?? []).find(urlMap => AnyPageProps.normalizeSource(urlMap.source) === source)?.destination;
  }

  public async getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>> {
    if (!params) {
      return {
        notFound: true,
      };
    }

    const source = params.any.join('/');
    const destination = this.findDestination(source);
    if (!destination) {
      return {
        notFound: true,
      };
    }

    return {
      redirect: {
        permanent: true,
        destination: `/${pluralize(destination.postType ?? this.settings.postType?.default ?? PostType.DEFAULT_POST_TYPE)}/${Id.create({
          source: Source.create(destination.source),
          id: destination.id,
        }).value}`,
      },
    };
  }
}
