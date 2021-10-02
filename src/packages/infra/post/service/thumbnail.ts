import type { IThumbnailService, Props } from '$/domain/post/service/thumbnail';
import axios from 'axios';
import sharp from 'sharp';
import { singleton } from 'tsyringe';
import { getAbsoluteUrl } from '@/lib/helpers/url';

@singleton()
export class ThumbnailService implements IThumbnailService {
  private static __cache: Record<string, string | undefined> = {};

  public async toBase64(settings: { siteUrl: string }, thumbnail?: string, props?: Props): Promise<string | undefined> {
    if (!thumbnail) {
      return undefined;
    }

    if (!/\.(jpe?g|png)$/.test(thumbnail)) {
      return thumbnail;
    }

    if (!(thumbnail in ThumbnailService.__cache)) {
      try {
        const response = await axios.get(getAbsoluteUrl(thumbnail, settings), { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        const dimensions = { width: props?.width ?? 200, height: props?.height ?? 120 };
        ThumbnailService.__cache[thumbnail] = `data:image/webp;base64,${(await sharp(imageBuffer)
          .resize({
            ...dimensions,
            fit: props?.fit ?? 'cover',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .webp({ quality: props?.quality ?? 65 })
          .toBuffer()).toString('base64')}`;
      } catch (error) {
        console.log(thumbnail, error);
        ThumbnailService.__cache[thumbnail] = thumbnail;
      }
    }

    return ThumbnailService.__cache[thumbnail];
  }
}
