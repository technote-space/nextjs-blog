import type { IPage } from '$/domain/shared/page';
import type { Post } from '@/lib/posts';

export type Props = {
  posts: Post[];
};

export interface IIndexPage extends IPage<Props> {
}
