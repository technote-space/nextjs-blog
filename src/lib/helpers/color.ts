import DominantColor from '$/domain/post/valueObject/dominantColor';
import { getAverageColor } from 'fast-average-color-node';

// TODO: Add test
export const getDominantColor = async (imageUrl?: string, retry = 3): Promise<DominantColor | undefined> => {
  if (imageUrl) {
    for (let i = retry; --i >= 0;) {
      try {
        const color = await getAverageColor(imageUrl, {
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
