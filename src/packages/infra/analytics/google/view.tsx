import type { VFC } from 'react';
import { memo } from 'react';

type Props = {
  gaMeasurementId: string;
}

const View: VFC<Props> = ({ gaMeasurementId }) => {
  if (!gaMeasurementId) {
    return null;
  }

  return <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}/>
    <script
      dangerouslySetInnerHTML={{
        __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', {
                    page_path: window.location.pathname,
                  });`,
      }}
    />
  </>;
};

View.displayName = 'AnalyticsView';
export default memo(View);
