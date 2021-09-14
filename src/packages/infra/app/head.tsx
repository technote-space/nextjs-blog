import type { IHeadComponent } from '$/domain/app/head';
import { memo } from 'react';
import NextHead from 'next/head';
import { BaseComponent } from '$/infra/shared/component';
import { singleton } from 'tsyringe';

@singleton()
export class HeadComponent extends BaseComponent implements IHeadComponent {
  public constructor() {
    super();
  }

  protected getComponent() {
    const component = memo(() => {
      return <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI('Next.js Sample Website')}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content="Next.js Sample Website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        {/*<meta name="description" content={description} />*/}
        {/*/!* Twitter *!/*/}
        {/*<meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />*/}
        {/*<meta name="twitter:site" content="@MaterialUI" />*/}
        {/*<meta name="twitter:title" content={title} />*/}
        {/*<meta name="twitter:description" content={description} />*/}
        {/*<meta name="twitter:image" content={card} />*/}
        {/*/!* Facebook *!/*/}
        {/*<meta property="og:type" content="website" />*/}
        {/*<meta property="og:title" content={title} />*/}
        {/*<meta property="og:url" content={`https://material-ui.com`} />*/}
        {/*<meta property="og:description" content={description} />*/}
        {/*<meta property="og:image" content={card} />*/}
        {/*<meta property="og:ttl" content="604800" />*/}
      </NextHead>;
    });
    component.displayName = 'Head';

    return component;
  }
}
