import type { IColorService } from '$/domain/post/service/color';
import { singleton } from 'tsyringe';
import DominantColor from '$/domain/post/valueObject/dominantColor';

@singleton()
export class ColorServiceForVercel implements IColorService {
  public async getDominantColor(imageUrl?: string, siteUrl?: string, retry?: number): Promise<DominantColor | undefined> {
    return undefined;
  }
}
