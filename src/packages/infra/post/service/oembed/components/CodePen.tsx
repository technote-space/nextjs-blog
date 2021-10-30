import type { VFC } from 'react';

type Props = {
  url: string;
};

const CodePen: VFC<Props> = ({ url }) => {
  const _url = new URL(url.replace('/pen/', '/embed/'));
  _url.searchParams.set('embed-version', '2');
  return <div className="embed-codepen" style={{
    width: '100%',
    paddingBottom: '56.25%',
    height: 0,
    position: 'relative',
  }}>
    <iframe
      src={_url.toString()}
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
CodePen.displayName = 'CodePen';

export default CodePen;
