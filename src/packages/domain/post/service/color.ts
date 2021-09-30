import type DominantColor from '$/domain/post/valueObject/dominantColor';

export interface IColorService {
  getDominantColor(imageUrl?: string, siteUrl?: string, retry?: number): Promise<DominantColor | undefined>;
}
