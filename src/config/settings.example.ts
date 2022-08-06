import type { Settings } from '@/domain/app/settings';

// key => sourceId
// 現在使用可能なkey: markdown, wpdb, wpxml
const targetSources = Array.from(new Set((process.env.SOURCES ?? '').split(',').map(v => v.trim()).filter(v => v)));
export const postSources: Record<string, string> = {
  // posts ディレクトリに作成した markdown で記事作成
  ...(process.env.MD_SOURCE && targetSources.includes('markdown') ? { 'markdown': process.env.MD_SOURCE } : {}),
  // .env で接続した WordPress の wp_posts で記事作成
  ...(process.env.WP_DB_SOURCE && targetSources.includes('wpdb') ? { 'wpdb': process.env.WP_DB_SOURCE } : {}),
  // WordPress の エクスポート機能で出力されたXMLファイルで記事作成
  ...(process.env.WP_XML_SOURCE && process.env.WP_EXPORT_XML && targetSources.includes('wpxml') ? { 'wpxml': process.env.WP_XML_SOURCE } : {}),
};
const derivedSources = {
  ...('markdown' in postSources ? { [process.env.MD_SOURCE!]: (process.env.MD_SOURCE_DERIVED_SOURCES ?? '').split(',').filter(s => s) } : {}),
  ...('wpdb' in postSources ? { [process.env.WP_DB_SOURCE!]: (process.env.WP_DB_DERIVED_SOURCES ?? '').split(',').filter(s => s) } : {}),
  ...('wpxml' in postSources ? { [process.env.WP_XML_SOURCE!]: (process.env.WP_XML_DERIVED_SOURCES ?? '').split(',').filter(s => s) } : {}),
};
export const settings: Settings = {
  targetSources,
  derivedSources,
  // 本文内で置換
  // WordPressで使用していたショートコードなどはここで置換処理を記述
  replace: [
    {
      source: [postSources['wpdb'], postSources['wpxml']],
      from: /<pre class="wp-block-code\s+(\w+)(\s.+?)?"><code>/g,
      to: '<pre class="language-$1$2"><code class="language-$1">',
    },
    {
      source: [postSources['wpdb'], postSources['wpxml']],
      from: /<!--\s+\/?wp:.+?\s+-->\n/g,
      to: '',
    },
  ],
  // 除外設定
  exclude: [
    // WordPress の ID = 123 の投稿を除外
    // {
    //   source: [postSources['wpdb'], postSources['wpxml']],
    //   id: '123',
    // },
    // WordPress の wp_terms.slug = 'test' のタグ に紐付いた投稿を除外
    // type = category でカテゴリー
    // {
    //   source: [postSources['wpdb'], postSources['wpxml']],
    //   type: 'post_tag',
    //   id: 'test',
    // },
  ],
  // 移行前のURLと新しいURLの紐付け設定
  urlMaps: [
    // {
    //   source: '/blog/archives/192',
    //   destination: {
    //     source: postSources['wpxml'],
    //     id: 'mapped-page',
    //   },
    // },
  ],
  // 目次
  toc: {
    postTypes: ['post'],
    headings: ['h1', 'h2', 'h3', 'h4'],
  },
  // 日付を表示しない設定
  postType: {
    // 固定ページ
    hideDate: ['page'],
  },
  // 固定ページへのリンク表示
  // pages: {
  //   header: [],
  //   footer: [
  //     {
  //       source: postSources['wpxml'],
  //       id: 'contact',
  //       postType: 'page',
  //       title: 'お問い合わせ',
  //     },
  //   ],
  // },
  perPage: Number(process.env.PER_PAGE ?? '10'),
  isIsr: !!process.env.IS_ISR,
  isrRevalidate: process.env.ISR_REVALIDATE ? Number(process.env.ISR_REVALIDATE) : undefined,
  wpdb: process.env.WP_DB_SOURCE ? {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  } : undefined,
  wpExportXml: process.env.WP_XML_SOURCE && process.env.WP_EXPORT_XML ? {
    path: process.env.WP_EXPORT_XML,
    urlMaps: !!process.env.WP_EXPORT_XML_URL_MAPS,
    assetsSiteUrl: process.env.WP_EXPORT_XML_ASSETS_SITE_URL,
  } : undefined,
  siteUrl: (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : undefined) || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  },
  advertising: {
    googleAdsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_ID,
  },
  seo: {
    blogTitle: process.env.NEXT_PUBLIC_BLOG_TITLE || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE || 'Hello World!',
    author: process.env.NEXT_PUBLIC_BLOG_AUTHOR || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME || 'Hello World!',
    description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE || 'Hello World!',
    blogImage: process.env.NEXT_PUBLIC_BLOG_IMAGE,
    twitter: process.env.NEXT_PUBLIC_TWITTER_ID,
    noindex: !!process.env.NEXT_PUBLIC_NOINDEX,
  },
  oembed: {
    blogCardUrlPattern: process.env.BLOG_CARD_URL_PATTERN,
  },
};
