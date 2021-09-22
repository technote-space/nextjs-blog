import type { Settings } from '$/domain/app/settings';
import type { IAnyPageProps, Props } from '$/domain/pages/any';
import type { Params, Paths } from '$/domain/pages/any';
import type { IPostManager } from '$/domain/post/manager';
import { singleton, inject } from 'tsyringe';
import Id from '$/domain/post/valueObject/id';
import Source from '$/domain/post/valueObject/source';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import { fromEntity } from '$/infra/post/dto/postDetail';

@singleton()
export class AnyPageProps implements IAnyPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  public async getStaticPaths(): Promise<Paths> {
    const ids = Object.assign({}, ...(await this.postManager.getIds()).map(id => ({ [id.value]: true })));

    return {
      paths: (this.settings.urlMaps ?? [])
        .map(urlMap => ({
          id: Id.create({ source: Source.create(urlMap.destination.source), id: urlMap.destination.id }),
          source: urlMap.source,
        }))
        .filter(({ id }) => id.value in ids).map(({ source }) => ({
          params: { any: source.replace(/^\//, '').split('/') },
        })),
      fallback: false,
    };
  }

  private findDestination(source: string): { source: string; id: string | number } | undefined {
    return (this.settings.urlMaps ?? []).find(urlMap => urlMap.source.replace(/^\//, '') === source)?.destination;
  }

  public async getStaticProps(params?: Params): Promise<Props> {
    if (!params) {
      throw new NotFoundException;
    }

    const source = params.any.join('/');
    const destination = this.findDestination(source);

    if (!destination) {
      throw new NotFoundException;
    }

    return {
      post: await fromEntity(await this.postManager.fetch(Id.create({
        source: Source.create(destination.source),
        id: destination.id,
      }))),
    };
  }
}
