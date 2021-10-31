import type { Tag } from '$/domain/post/entity/tag';

export interface ITagRepository {
  setSourceId(sourceId: string): void;

  all(): Promise<Tag[]>;
}
