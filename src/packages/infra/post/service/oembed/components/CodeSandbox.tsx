import type { VFC } from 'react';

type Props = {
  url: string;
};

const CodeSandbox: VFC<Props> = ({ url }) => {
  return <div className="embed-codesandbox" style={{
    width: '100%',
    paddingBottom: '56.25%',
    height: 0,
    position: 'relative',
  }}>
    <iframe
      src={url}
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
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  </div>;
};
CodeSandbox.displayName = 'CodeSandbox';

export default CodeSandbox;
