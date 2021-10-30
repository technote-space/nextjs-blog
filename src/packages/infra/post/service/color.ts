import type { IColorService } from '$/domain/post/service/color';
import { inject, singleton } from 'tsyringe';
import { Settings } from '$/domain/app/settings';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import { loadImage } from '@/lib/helpers/image';

@singleton()
export class ColorService implements IColorService {
  public constructor(@inject('Settings') private settings: Settings) {
  }

  public async getDominantColor(imageUrl: string | undefined, siteUrl: string, retry?: number): Promise<DominantColor | undefined> {
    if (imageUrl) {
      const url = imageUrl.startsWith('/') ? `${siteUrl.replace(/\/$/, '')}${imageUrl}` : imageUrl;
      const imageBuffer = await loadImage(url, siteUrl);
      for (let i = retry ?? 3; --i >= 0;) {
        try {
          const color = await (await import('fast-average-color-node')).getAverageColor(imageBuffer, {
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
