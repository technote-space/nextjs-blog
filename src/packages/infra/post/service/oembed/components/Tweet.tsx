import type { FC } from 'react';

type Props = {
  url: string;
};

const Tweet: FC<Props> = ({ url }) => {
  const id = url.replace(/^https:\/\/twitter\.com\/[a-zA-Z0-9_-]+\/status\/([a-zA-Z0-9?=]+)$/, '$1');
  return <div className="embed-tweet">
    <iframe
      id={`twitter-widget-${id}`}
      src={`https://platform.twitter.com/embed/Tweet.html?embedId=twitter-widget-${id}&frame=false&hideCard=false&hideThread=false&id=${id}&theme=light&widgetsVersion=1890d59c%3A1627936082797&width=450px`}
      style={{
        position: 'static',
        visibility: 'visible',
        display: 'block',
        flexGrow: 1,
        width: 450,
        maxWidth: '100%',
        height: 660,
        maxHeight: `calc(100vw * 1.6)`,
      }}
      scrolling="no"
      frameBorder="0"
      allowFullScreen
      allowTransparency
      title="Twitter Tweet"
      loading="lazy"
    />
  </div>;
};
Tweet.displayName = 'Tweet';

export default Tweet;
