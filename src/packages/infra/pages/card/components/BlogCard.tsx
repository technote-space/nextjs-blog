import type { FC } from 'react';
import { escapeHtml } from '@/lib/helpers/string';
import { getDomainName } from '@/lib/helpers/url';

type Props = {
  url: string;
  title?: string;
  description?: string;
  image: string;
  dominantColor?: string;
  canonical?: string;
  source?: string;
};

const BlogCard: FC<Props> = ({ url, title, description, image, dominantColor, canonical, source }) => {
  return <html lang="ja">
  <head>
    <meta charSet="utf-8"/>
    <title>blog card</title>
    <style dangerouslySetInnerHTML={{__html: `
.blog-card {
    position: relative;
}

.blog-card>a {
    display: -webkit-flex;
    display: -moz-box;
    display: flex;
    font-size: 13px;
    line-height: 1.45em;
    -webkit-transition: height .3s ease;
    transition: height .3s ease;
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
    color: #1c1c1c;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.blog-card>a .blog-card__image {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    width: 40%;
    height: 0;
    padding-bottom: 21%;
    -webkit-align-self: center;
    align-self: center;
    -webkit-transition: -webkit-transform .5s ease;
    transition: -webkit-transform .5s ease;
    transition: transform .5s ease;
    transition: transform .5s ease,-webkit-transform .5s ease;
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
}

.blog-card>a .blog-card__details {
    display: -webkit-flex;
    display: -moz-box;
    display: flex;
    z-index: 0;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    flex-direction: column;
    -webkit-flex-grow: 1;
    -moz-box-flex: 1;
    flex-grow: 1;
    padding: 10px 16px;
    background: #fff
}

.blog-card>a .blog-card__details>div {
    margin: 0 0 4px
}

.blog-card>a .blog-card__details .blog-card__details__title {
    font-size: 1.2em;
    line-height: 1.4em;
    font-weight: 700
}

.blog-card>a .blog-card__details .blog-card__details__source {
    display: -webkit-flex;
    display: -moz-box;
    display: flex;
    -webkit-flex-grow: 1;
    -moz-box-flex: 1;
    flex-grow: 1;
    -webkit-align-items: flex-end;
    -moz-box-align: end;
    align-items: flex-end;
    -webkit-justify-content: flex-end;
    -moz-box-pack: end;
    justify-content: flex-end
}

.blog-card>a .blog-card__details .blog-card__details__source .blog-card__details__source__favicon {
    width: 16px;
    height: 16px;
    background-size: cover;
    margin-right: 3px
}

.blog-card>a:visited {
    color: #1c1c1c
}

.blog-card>a:hover {
    color: #e53900
}

.blog-card>a:hover .blog-card__image {
    -webkit-transform: scale(1.05);
    transform: scale(1.05)
}

@media screen and (max-width: 680px) {
    .blog-card>a .blog-card__image {
        width:46%;
        padding-bottom: 24%
    }
}

@media screen and (max-width: 540px) {
    .blog-card>a {
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        flex-direction: column;
        border: 1px solid #ccc
    }

    .blog-card>a .blog-card__image {
        width: 100%;
        padding-bottom: 53%
    }

    .blog-card>a .blog-card__details {
        border-top: 1px solid #ccc
    }
}
      `}}/>
  </head>
  <body style={{ margin: 0 }}>
  <div className='blog-card'>
    <a href={canonical || url} target="_blank" rel="noopener noreferrer">
      <div className='blog-card__image' style={{
        backgroundImage: `url(${image})`,
        backgroundColor: dominantColor ?? '#ccc',
      }}/>
      <div className='blog-card__details'>
        <div className='blog-card__details__title'>{title || url}</div>
        <div className='blog-card__details__description'>{description ?? ''}</div>
        <div className='blog-card__details__source'>
          <div className='blog-card__details__source__favicon' style={{
            backgroundImage: `url(https://www.google.com/s2/favicons?domain=${escapeHtml(getDomainName(url))})`,
          }}/>
          <div className='blog-card__details__source__name'>{source || getDomainName(url)}</div>
        </div>
      </div>
    </a>
  </div>
  </body>
  </html>;
};
BlogCard.displayName = 'BlogCard';

export default BlogCard;
