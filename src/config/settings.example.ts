import type { Settings } from '$/domain/app/settings';

// key => sourceId
// 現在使用可能なkey: md, wp
export const postSources: Record<string, string> = {
  // posts ディレクトリに作成した markdown で記事作成
  'md': 'md',
  // .env で接続した WordPress の wp_posts で記事作成
  // 'wp': wp,
};
export const settings: Settings = {
  // 本文内で置換
  // WordPressで使用していたショートコードなどはここで置換処理を記述
  replace: [
    {
      source: postSources['wp'],
      from: /class="(.+?\s)?wp-block-code\s+(\w+)(\s.+?)?"/g,
      to: 'class="$1language-$2$3"',
    },
    {
      source: postSources['wp'],
      from: /<!--\s+\/?wp:.+?\s+-->\n/g,
      to: '',
    },
  ],
  // 除外設定
  exclude: [
    // WordPress の ID = 123 の投稿を除外
    // {
    //   source: postSources['wp'],
    //   id: '123',
    // },
    // WordPress の term_taxonomy_id = 123 に紐付いた投稿を除外
    // {
    //   source: postSources['wp'],
    //   type: 'term',
    //   id: '123',
    // },
  ],
  urlMaps: [
    // 移行前のURLと新しいURLの紐付け設定
    // {
    //   source: '/old/graph-structured-program-evolution',
    //   destination: {
    //     source: postSources['wp'],
    //     id: 'graph-structured-program-evolution',
    //   },
    // },
  ],
  // 目次
  toc: {
    postTypes: ['post'],
    headings: ['h1', 'h2', 'h3', 'h4'],
  },
  // 固定ページは日付を表示しない設定
  postType: {
    hideDate: ['page'],
  },
  // 固定ページへのリンク表示
  // pages: {
  //   header: [],
  //   footer: [
  //     {
  //       source: postSources['wp'],
  //       id: 'contact',
  //       postType: 'page',
  //       title: 'お問い合わせ',
  //     },
  //   ],
  // },
  isIsr: !!process.env.IS_ISR,
  isrRevalidate: process.env.ISR_REVALIDATE ? Number(process.env.ISR_REVALIDATE) : undefined,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  },
  advertising: {
    googleAdsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_ID,
  },
  seo: {
    blogTitle: process.env.NEXT_PUBLIC_BLOG_TITLE ?? 'Hello World!',
    author: process.env.NEXT_PUBLIC_BLOG_AUTHOR ?? 'Hello World!',
    description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ?? 'Hello World!',
    blogImage: process.env.NEXT_PUBLIC_BLOG_IMAGE,
    twitter: process.env.NEXT_PUBLIC_TWITTER_ID,
  },
};
