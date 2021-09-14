import type { IPage } from '$/domain/shared/page';
import type { Post } from '@/lib/posts';

export type Props = {
  post: Post;
};

export interface IPostPage extends IPage<Props> {
}
