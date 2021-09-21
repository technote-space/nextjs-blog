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
  replace: [
    {
      source: 'wp',
      from: /class="(.+?\s)?wp-block-code\s+(\w+)(\s.+?)?"/g,
      to: 'class="$1language-$2$3"',
    },
  ],
};
