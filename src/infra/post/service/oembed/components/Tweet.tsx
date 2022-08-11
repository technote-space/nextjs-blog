import type { FC } from 'react';

type Props = {
  url: string;
};

const Tweet: FC<Props> = ({ url }) => {
  const id = url.replace(/^https:\/\/twitter\.com\/[a-zA-Z0-9_-]+\/status\/([a-zA-Z0-9?=]+)$/, '$1');
  return <div className="embed-tweet">
    <blockquote className="twitter-tweet" style={{ display: 'none' }}>
      <a href={`https://twitter.com/nishishi/status/${id}`}/>
    </blockquote>
  </div>;
};
Tweet.displayName = 'Tweet';

export default Tweet;
