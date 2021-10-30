import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import { getAbsoluteUrl } from '@/lib/helpers/url';

export const loadImage = async (url: string, siteUrl: string): Promise<Buffer> => {
  if (!/^https?/.test(url)) {
    const path = process.env.VERCEL ? join(process.cwd(), url) : join(process.cwd(), 'public', url);
    if (existsSync(path)) {
      return readFileSync(path);
    }
  }

  const response = await axios.get(getAbsoluteUrl(url, { siteUrl }), { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
};
