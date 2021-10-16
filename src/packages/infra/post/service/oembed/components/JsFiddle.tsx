import type { VFC } from 'react';

type Props = {
  url: string;
};

const JsFiddle: VFC<Props> = ({ url }) => {
  const _url = url.includes('embed') ? url : `${url.replace(/\/$/, '')}/embedded/`;
  return <div className="embed-jsfiddle" style={{
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
JsFiddle.displayName = 'JsFiddle';

export default JsFiddle;
