import type { IComponent } from '@/domain/shared/component';
import type { ServerProps } from '@/domain/shared/page';

export type Props = Pick<ServerProps, 'headerPages'>;
export type IHeaderComponent = IComponent<Props>
