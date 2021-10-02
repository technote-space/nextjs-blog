import type { VFC } from 'react';
import { memo } from 'react';

type Props = {
  googleAdsenseClientId: string;
}

const View: VFC<Props> = ({ googleAdsenseClientId }) => {
  if (!googleAdsenseClientId) {
    return null;
  }

  return <script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseClientId}`}
    crossOrigin="anonymous"
  />;
};

View.displayName = 'AnalyticsView';
export default memo(View);
