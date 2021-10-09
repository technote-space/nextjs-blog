export type Props = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export interface IThumbnailService {
  toBase64(settings: { siteUrl: string }, thumbnail?: string, props?: Props): Promise<string | undefined>;
}
