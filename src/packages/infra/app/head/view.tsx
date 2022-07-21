import type { HooksParams } from '$/infra/app/head/hooks';
import type { FC } from 'react';
import NextHead from 'next/head';

const View: FC<HooksParams> = ({ title, description, image, url, type, twitter }) => <NextHead>
  <meta name="viewport" content="initial-scale=1, width=device-width"/>
  <link rel="icon" href="/favicon.ico"/>
  <title>{title}</title>
  <meta name="description" content={description}/>
  <link rel="canonical" href={url}/>
  {/*/!* Twitter *!/*/}
  <meta name="twitter:card" content="summary"/>
  {twitter && <meta name="twitter:site" content={twitter}/>}
  <meta name="twitter:title" content={title}/>
  <meta name="twitter:description" content={description}/>
  <meta name="twitter:image" content={image}/>
  {/*/!* Facebook *!/*/}
  <meta property="og:type" content={type}/>
  <meta property="og:title" content={title}/>
  <meta property="og:url" content={url}/>
  <meta property="og:description" content={description}/>
  <meta property="og:image" content={image}/>
  <meta property="og:ttl" content="604800"/>
</NextHead>;

View.displayName = 'HeadView';
export default View;
