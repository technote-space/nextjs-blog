import DominantColor from '$/domain/post/valueObject/dominantColor';
import { getAverageColor } from 'fast-average-color-node';

// TODO: Add test
export const getDominantColor = async (imageUrl?: string, siteUrl?: string, retry = 3): Promise<DominantColor | undefined> => {
  if (imageUrl) {
    const url = imageUrl.startsWith('/') ? `${siteUrl?.replace(/\/$/, '')}${imageUrl}` : imageUrl;
    for (let i = retry; --i >= 0;) {
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
};
