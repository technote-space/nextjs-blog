import { VFC } from 'react';

type Props = {
  url: string;
};

const StackBlitz: VFC<Props> = ({ url }) => {
  const _url = url.includes('embed') ? url : `${url.includes('?') ? `${url}&embed=1` : `${url}?embed=1`}`;
  return <div className="embed-stackblitz" style={{
    width: '100%',
    paddingBottom: '56.25%',
    height: 0,
    position: 'relative',
  }}>
    <iframe
      src={_url}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      scrolling="no"
      frameBorder="no"
      allowTransparency
      allowFullScreen
      loading="lazy"
    />
  </div>;
};
StackBlitz.displayName = 'StackBlitz';

export default StackBlitz;
