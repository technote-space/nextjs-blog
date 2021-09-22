import type { IHeadComponent, Props } from '$/domain/app/head';
import type { Settings } from '$/domain/app/settings';
import type { VFC } from 'react';
import NextHead from 'next/head';
import { memo } from 'react';
import { inject, singleton } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class HeadComponent extends BaseComponent<Props> implements IHeadComponent {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
    super();
  }

  private getTitle(props: Props) {
    return props.title ? `${props.title} | ${this.settings.seo.blogTitle}` : this.settings.seo.blogTitle;
  }

  private getDescription(props: Props) {
    return (props.description ?? this.settings.seo.description).replace(/\r?\n/g, ' ').replace(/\s{2,}/, ' ');
  }

  private getBlogImage(props: Props) {
    return props.image ?? this.settings.seo.blogImage ?? `https://og-image.vercel.app/${encodeURI(this.getTitle(props))}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`;
  }

  private getUrl(props: Props) {
    if (props.canonical) {
      if (/^https?/.test(props.canonical)) {
        return props.canonical;
      }

      return `${this.settings.siteUrl.replace(/\/$/, '')}/${props.canonical.replace(/^\//, '')}`;
    }

    return this.settings.siteUrl;
  }

  protected getComponent(): VFC<Props> {
    const component = memo((props: Props) => {
      const title = this.getTitle(props);
      const description = this.getDescription(props);
      const image = this.getBlogImage(props);
      const url = this.getUrl(props);

      return <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
        <link rel="icon" href="/favicon.ico"/>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <link rel="canonical" href={url}/>
        {/*/!* Twitter *!/*/}
        <meta name="twitter:card" content="summary"/>
        {this.settings.seo.twitter &&
        <meta name="twitter:site" content={`@${this.settings.seo.twitter.replace(/^@/, '')}`}/>}
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={image}/>
        {/*/!* Facebook *!/*/}
        <meta property="og:type" content={props.title ? 'article' : 'website'}/>
        <meta property="og:title" content={title}/>
        <meta property="og:url" content={url}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={image}/>
        <meta property="og:ttl" content="604800"/>
      </NextHead>;
    });
    component.displayName = 'Head';

    return component;
  }
}
