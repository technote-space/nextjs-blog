import type { FC } from 'react';
import { escapeHtml } from '@/lib/helpers/string';
import { extractYoutubeVideoParameters } from '@/lib/helpers/url';

type Props = {
  url: string;
};

const YouTube: FC<Props> = ({ url }) => {
  const params = extractYoutubeVideoParameters(url);
  if (!params) {
    return null;
  }

  const escapedVideoId = escapeHtml(params.videoId);
  const time = Math.min(Number(params.start || 0), 48 * 60 * 60);
  const startQuery = time ? `&start=${time}` : '';

  return <div className="embed-youtube" style={{
    width: '100%',
    paddingBottom: '56.25%',
    height: 0,
    position: 'relative',
  }}>
    <iframe
      src={`https://www.youtube.com/embed/${escapedVideoId}?loop=1&playlist=${escapedVideoId}${startQuery}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      allowFullScreen
      loading="lazy"
    />
  </div>;
};
YouTube.displayName = 'YouTube';

export default YouTube;
