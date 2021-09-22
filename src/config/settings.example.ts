import type { Settings } from '$/domain/app/settings';

export const postSources = [
  // posts ディレクトリに作成した markdown で記事作成
  'md',
  // .env で接続した WordPress の wp_posts で記事作成
  // 'wp',
];
export const settings: Settings = {
  blogTitle: 'Hello World!',
  author: 'Hello World!',
  // 本文内で置換
  replace: [
    {
      source: 'wp',
      from: /class="(.+?\s)?wp-block-code\s+(\w+)(\s.+?)?"/g,
      to: 'class="$1language-$2$3"',
    },
  ],
  //
  exclude: [
    // WordPress の ID = 123 の投稿を除外
    // {
    //   source: 'wp',
    //   id: '123',
    // },
    // WordPress の term_taxonomy_id = 123 に紐付いた投稿を除外
    // {
    //   source: 'wp',
    //   type: 'term',
    //   id: '123',
    // },
  ],
  urlMaps: [
    // 移行前のURLと新しいURLの紐付け設定
    // {
    //   source: '/old/graph-structured-program-evolution',
    //   destination: {
    //     source: 'wp',
    //     id: 'graph-structured-program-evolution',
    //   },
    // },
  ],
};
