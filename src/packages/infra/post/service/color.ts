import type { IColorService } from '$/domain/post/service/color';
import { getAverageColor } from 'fast-average-color-node';
import { singleton } from 'tsyringe';
import DominantColor from '$/domain/post/valueObject/dominantColor';

@singleton()
export class ColorService implements IColorService {
  public async getDominantColor(imageUrl?: string, siteUrl?: string, retry?: number): Promise<DominantColor | undefined> {
    if (imageUrl) {
      const url = imageUrl.startsWith('/') ? `${siteUrl?.replace(/\/$/, '')}${imageUrl}` : imageUrl;
      for (let i = retry ?? 3; --i >= 0;) {
        try {
          const color = await getAverageColor(url, {
            defaultColor: [255, 255, 255, 255],
          });
          return DominantColor.create(color.rgba);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return undefined;
  }
}
