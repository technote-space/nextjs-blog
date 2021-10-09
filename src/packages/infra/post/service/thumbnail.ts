import type { IThumbnailService, Props } from '$/domain/post/service/thumbnail';
import { promises, existsSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import sharp from 'sharp';
import { singleton } from 'tsyringe';
import { getAbsoluteUrl } from '@/lib/helpers/url';

@singleton()
export class ThumbnailService implements IThumbnailService {
  private static __cache: Record<string, string | undefined> = {};

  private static async getImageBuffer(settings: { siteUrl: string }, thumbnail: string): Promise<Buffer> {
    if (!/^https?/.test(thumbnail)) {
      const path = process.env.VERCEL ? join(process.cwd(), thumbnail) : join(process.cwd(), 'public', thumbnail);
      if (!/^https?/.test(thumbnail) && existsSync(path)) {
        return promises.readFile(path);
      }
    }

    const response = await axios.get(getAbsoluteUrl(thumbnail, settings), { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  }

  public async toBase64(settings: { siteUrl: string }, thumbnail?: string, props?: Props): Promise<string | undefined> {
    if (!thumbnail) {
      return undefined;
    }

    if (!/\.(jpe?g|png)$/.test(thumbnail)) {
      return thumbnail;
    }

    if (!(thumbnail in ThumbnailService.__cache)) {
      try {
        const imageBuffer = await ThumbnailService.getImageBuffer(settings, thumbnail);
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
