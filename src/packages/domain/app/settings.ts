import type { HeadingTagName } from '@jsdevtools/rehype-toc';

export type PostData<SourceType extends string | string[]> = {
  source: SourceType;
  id: string | number;
  postType?: string;
};
type Replace = {
  source?: string[];
  from: string | RegExp;
  to: string;
};
type Exclude = PostData<string[]> & {
  type?: string;
};
export type UrlMap = {
  source: string;
  destination: PostData<string>;
};
type PageData = PostData<string> & {
  title: string;
};
type SEO = {
  blogTitle: string;
  author: string;
  description: string;
  blogImage?: string;
  twitter?: string;
};
export type Settings = {
  isIsr?: boolean;
  isrRevalidate?: number;
  siteUrl: string;
  replace?: Replace[];
  exclude?: Exclude[];
  urlMaps?: UrlMap[];
  toc?: {
    postTypes?: string[];
    headings?: HeadingTagName[];
  };
  seo: SEO;
  analytics?: {
    googleAnalyticsId?: string;
  };
  advertising?: {
    googleAdsenseClientId?: string;
  };
  postType?: {
    default?: string;
    hideDate?: string[];
  };
  pages?: {
    header?: PageData[];
    footer?: PageData[];
  };
  wpdb?: {
    host?: string | undefined;
    port?: number | undefined;
    user?: string | undefined;
    password?: string | undefined;
    database?: string | undefined;
  };
  wpExportXml?: {
    path: string;
  };
  slack?: {
    webhookUrl?: string;
  };
};
