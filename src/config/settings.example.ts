import type { Settings } from '$/domain/app/settings';

// key => sourceId
export const postSources: Record<string, string> = {
  // posts ディレクトリに作成した markdown で記事作成
  'md': 'md',
  // .env で接続した WordPress の wp_posts で記事作成
  // 'wp': wp,
};
export const settings: Settings = {
  isIsr: true,
  isrRevalidate: 60,
  siteUrl: 'http://localhost:3000',
  // gaMeasurementId: 'UA-xxxxxxxx-y',
  seo: {
    blogTitle: 'Hello World!',
    author: 'Hello World!',
    description: 'Hello World!',
    // blogImage: 'https://example.com/hello_world.png',
    // twitter: 'hello_world',
  },
  // 本文内で置換
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
};
